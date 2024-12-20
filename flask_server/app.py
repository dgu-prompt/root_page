import os
import boto3
import yaml
import shutil
import csv
from collections import OrderedDict
from flask_cors import CORS
import json
from flask import redirect, Flask, send_from_directory, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from werkzeug.security import generate_password_hash, check_password_hash
from aws_service import get_control_status_counts2,get_controls_by_ids_from_aws, get_controls_with_compliance_results2, get_filtered_controls_list, set_securityhub_control_activation
from model import initialize_db, User, db
from user_service import register_user, login_user_func, logout_user_func, jwt_required
import uuid
from elasticsearch_dashboard import get_security_issues_filtered, analyze_security_issues
from dashboard_service import get_all_jira_users_logic, get_jira_user_logic, get_ticket_details, get_tickets_stats
from dotenv import load_dotenv
from flask_login import LoginManager
from yaml_service import find_yaml_file

load_dotenv()  # .env 파일에서 환경 변수 로드

app = Flask(__name__, static_folder='../react_client')
app.secret_key = os.getenv("SECRET_KEY")  # .env 파일의 SECRET_KEY 값으로 시크릿 키 설정
CORS(app)

# flask-login 초기화
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# 정확한 경로 설정
#나중에 코드 완성할 때는 실제 yaml이 저장될 위치로 수정
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'static')
target_dir = os.path.join(os.path.dirname(__file__), 'static_yaml')
ASSIGNEE_FILE_PATH = os.path.join(os.path.dirname(__file__), 'data', 'assignee.csv')

# MySQL 연결 설정 (환경 변수를 사용하여 설정)
db_user = os.getenv("DB_USERNAME")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  # SQLAlchemy 객체 초기화

# 데이터베이스 초기화
# flask-login 사용자 로드 함수
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# 회원가입 엔드포인트
@app.route('/api/register', methods=['POST'])
def register():
    return register_user(request)

# 로그인 엔드포인트
@app.route('/api/login', methods=['POST'])
def login():
    return login_user_func(request, app.secret_key)

# 로그아웃 엔드포인트
@app.route('/api/logout', methods=['POST'])
def logout():
    return logout_user_func()

# 보호된 라우트 예시
@app.route('/api/protected', methods=['GET'])
@jwt_required(app.secret_key)
def protected():
    return jsonify({"message": f"Hello, {request.user_id}! Welcome to the protected route."})


# 정적 폴더 초기화 함수
def clear_static_folder():
    print("Clearing static folder...")
    for filename in os.listdir(app.config['UPLOAD_FOLDER']):
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.isfile(file_path):
            os.remove(file_path)
    print("Static folder cleared.")

@app.route('/api/')
def health_check():
    return jsonify({"status": "healthy"}), 200

BASE_PATH = os.path.dirname(__file__)

@app.route('/api/count_yaml', methods=['GET'])
def count_yaml():
    regions_data = {}  # 리전 데이터를 저장할 딕셔너리
    alert_types = ["jira", "slack"]  # 참조할 alertType 값
    all_yaml_files = []  # 모든 YAML 파일 경로 저장

    try:
        # 모든 alertType 디렉토리에서 YAML 파일 수집
        for alert_type in alert_types:
            alert_type_path = os.path.join(BASE_PATH, alert_type)
            if not os.path.isdir(alert_type_path):  # 디렉토리 확인
                print(f"Warning: {alert_type_path} 디렉토리가 없습니다.")
                continue

            # alertType 디렉토리 내 YAML 파일 검색
            yaml_files = [os.path.join(alert_type_path, f) for f in os.listdir(alert_type_path) if f.endswith('.yaml')]
            all_yaml_files.extend(yaml_files)

        if not all_yaml_files:
            return jsonify({"error": "No YAML files found in specified directories."}), 404

        # 모든 YAML 파일 처리
        for yaml_path in all_yaml_files:
            try:
                # YAML 파일 읽기
                with open(yaml_path, 'r', encoding='utf-8') as file:
                    yaml_content = yaml.safe_load(file)

                # filter에서 region 값 추출
                filters = yaml_content.get("filter", [])
                region = "Unknown Region"  # 기본값

                for filter_item in filters:
                    term = filter_item.get("term", {})
                    region_value = term.get('aws.securityhub_findings.region.keyword')
                    if region_value:
                        region = region_value  # 첫 번째로 발견된 유효한 리전 값 사용
                        break

                # 리전 데이터 갱신
                if region not in regions_data:
                    regions_data[region] = {"region": region, "count": 0, "yamlName": []}

                # 리전 데이터 업데이트
                name = yaml_content.get('name', 'Unknown Rule Name')
                description = yaml_content.get('description', 'No description available')
                filename = os.path.basename(yaml_path)
                file_id = filename.replace('.yaml', '')
                alert_type = os.path.basename(os.path.dirname(yaml_path))

                regions_data[region]["yamlName"].append({
                    "id": file_id,
                    "name": name,
                    "alertType": alert_type,
                    "description": description
                })
                regions_data[region]["count"] += 1

            except FileNotFoundError:
                print(f"Error: File not found - {yaml_path}")
            except yaml.YAMLError:
                print(f"Error: Invalid YAML format - {yaml_path}")

    except Exception as e:
        return jsonify({"error": f"Failed to process YAML files. Exception: {e}"}), 500

    # JSON 응답 반환
    return jsonify(list(regions_data.values()))

@app.route('/api/read_yaml', methods=['POST'])
def edit_yaml():
    try:
        # 요청 데이터 파싱
        data = request.json
        file_id = data.get("id")

        # 필수 데이터 검증
        if not file_id:
            return jsonify({"error": "Missing required field: 'id'"}), 400

        # 파일 이름 생성
        file_name = f"{file_id}.yaml"

        # jira와 slack 디렉토리에서 파일 검색
        directories_to_search = [os.path.join(BASE_PATH, "jira"), os.path.join(BASE_PATH, "slack")]
        yaml_path = None
        alert_type = None

        for directory in directories_to_search:
            yaml_path = find_yaml_file(directory, file_name)
            if yaml_path:
                alert_type = os.path.basename(directory)  # 상위 폴더명(jira/slack)을 alertType으로 설정
                break

        if not yaml_path:
            return jsonify({"error": f"YAML file with id '{file_id}' not found."}), 404

        # YAML 파일 읽기
        with open(yaml_path, 'r', encoding='utf-8') as file:
            yaml_content = yaml.safe_load(file)

        # filter에서 region 값 추출
        filters = yaml_content.get("filter", [])
        region = ""
        for filter_item in filters:
            term = filter_item.get("term", {})
            region_value = term.get('aws.securityhub_findings.region.keyword')
            if region_value:
                region = region_value  # 첫 번째로 발견된 유효한 리전 값 사용
                break

      
        # 응답 데이터 구성
        response_data = {
            "id": file_id,
            "name": yaml_content.get("name", "Unknown Rule Name"),
            "description": yaml_content.get("description", "No description available"),
            "alertType": alert_type,
            "region": region,
            "controlIds": yaml_content.get("controlIds", []),
            "alertSubject": yaml_content.get("alertSubject", ""),
            "alertText": yaml_content.get("alertText", ""),
            "yamlPreview": yaml.dump(yaml_content, default_flow_style=False, allow_unicode=True),
        }

        # JiraRule 추가 필드
        if alert_type == "jira":
            response_data.update({
                "project": yaml_content.get("jira_project", "Unknown Project"),
                "assignee": yaml_content.get("jira_assignee", "Unassigned"),
                "priority": yaml_content.get("jira_priority"),
            })

        # JSON 응답 반환
        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/api/delete_yaml', methods=['DELETE'])
def delete_yaml():
    try:
        # 요청 데이터 파싱
        data = request.json
        file_id = data.get("id")

        # 필수 데이터 검증
        if not file_id:
            return jsonify({"error": "Missing required field: 'id'"}), 400

        # 파일 이름 생성
        file_name = f"{file_id}.yaml"

        # jira와 slack 디렉토리에서 파일 검색
        directories_to_search = [os.path.join(BASE_PATH, "jira"), os.path.join(BASE_PATH, "slack")]
        yaml_path = None
        alert_type = None

        for directory in directories_to_search:
            yaml_path = find_yaml_file(directory, file_name)
            if yaml_path:
                alert_type = os.path.basename(directory)  # 상위 폴더명(jira/slack)을 alertType으로 설정
                break
        
        if not yaml_path:
            return jsonify({"error": f"YAML file '{file_name}' not found."}), 404

        # YAML 파일 삭제
        os.remove(yaml_path)

        # alertType 설정 (파일이 존재했던 디렉토리명)
        alert_type = os.path.basename(os.path.dirname(yaml_path))

        # 응답 데이터 구성
        response_data = {
            "message": f"YAML file '{file_name}' successfully deleted.",
            "alertType": alert_type,
            "region": data.get("region", "Unknown Region"),
        }

        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500



# Default YAML 파일 경로
DEFAULT_PATHS = {
    "jira": os.path.join(BASE_PATH, "default", "jira_default.yaml"),
    "slack": os.path.join(BASE_PATH, "default", "slack_default.yaml"),
}

# default yaml 파일 복제 -> 복사 후 생성 api
@app.route('/api/add_rule_yaml', methods=['POST'])
def add_rule_yaml():
    try:
        # 요청 데이터 파싱
        data = request.get_json()
        alert_type = data.get("alertType")
        region = data.get("region")

        # alertType 및 region 값 검증
        if alert_type not in DEFAULT_PATHS:
            return jsonify({"status": "FAILED", "error": "Invalid alertType"}), 400
        if not region:
            return jsonify({"status": "FAILED", "error": "Region is required"}), 400

        # 원본 파일 경로
        source_file = DEFAULT_PATHS[alert_type]

        # 원본 파일 존재 여부 확인
        if not os.path.exists(source_file):
            return jsonify({"status": "FAILED", "error": "Default file not found"}), 404

        # 대상 경로 생성
        destination_dir = f"{alert_type}"
        os.makedirs(destination_dir, exist_ok=True)

        # 고유 파일명 생성
        unique_id = str(uuid.uuid4())  # UUID 생성
        unique_filename = f"{unique_id}.yaml"
        destination_file = os.path.join(destination_dir, unique_filename)

        # 파일 복제
        shutil.copyfile(source_file, destination_file)

        # 성공 응답: 파일명 반환
        return jsonify(unique_id), 200

    except Exception as e:
        # 에러 처리
        return jsonify({"status": "FAILED", "error": str(e)}), 500

@app.route('/api/preview_yaml', methods=['POST'])
def preview_yaml():
    try:
        # 요청 데이터 파싱
        data = request.json
        alert_type = data.get("alertType")
        region = data.get("region")
        file_id = data.get("id")

        # 필수 데이터 검증
        if not alert_type or not region or not file_id:
            return jsonify({"error": "Missing required fields: 'alertType', 'region', 'id'"}), 400

        # 파일 이름 생성
        file_name = f"{file_id}.yaml"
        
        # 기존 YAML 파일 경로
        yaml_path = os.path.join(BASE_PATH, alert_type, file_name)

        if not os.path.exists(yaml_path):
            return jsonify({"error": f"YAML file not found: {yaml_path}"}), 404

        # 기존 YAML 파일 읽기
        with open(yaml_path, 'r', encoding='utf-8') as file:
            yaml_content = yaml.safe_load(file)

         # YAML 내용 수정
        yaml_content["name"] = data.get("name", yaml_content.get("name"))
        yaml_content["description"] = data.get("description", yaml_content.get("description"))
        yaml_content["alert_subject"] = data.get("alertSubject", yaml_content.get("alert_subject"))
        yaml_content["jira_project"] = data.get("project", yaml_content.get("jira_project"))
        yaml_content["jira_assignee"] = data.get("assignee", yaml_content.get("jira_assignee"))
        yaml_content["jira_priority"] = data.get("priority", yaml_content.get("jira_priority"))

        # filter 수정: region 값을 업데이트
        if "filter" in yaml_content:
            for item in yaml_content["filter"]:
                if "term" in item and "aws.securityhub_findings.region.keyword" in item["term"]:
                    item["term"]["aws.securityhub_findings.region.keyword"] = region

        # filter 내 controlIds 수정
        control_ids = data.get("controlIds", [])
        if control_ids:
            yaml_content["filter"][-1]["terms"]["aws.securityhub_findings.generator.id.keyword"] = [
                f"security-control/{control_id}" for control_id in control_ids
            ]
            
        # 순서 유지
        yaml_content = dict(yaml_content)

        # 임시 YAML 파일 생성
        temp_file_name = f"temp_{file_name}"
        temp_yaml_path = os.path.join(BASE_PATH, alert_type, temp_file_name)

        with open(temp_yaml_path, 'w', encoding='utf-8') as temp_file:
            yaml.dump(yaml_content, temp_file, default_flow_style=False, allow_unicode=True)

        # 수정된 YAML 파일 내용을 문자열로 읽기
        with open(temp_yaml_path, 'r', encoding='utf-8') as temp_file:
            yaml_preview = temp_file.read()

        # 응답 데이터 구성
        response_data = {"yamlPreview": yaml_preview}

        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
    
@app.route('/api/final_submit_yaml', methods=['POST'])
def final_submit_yaml():
    try:
        data = request.json  # JSON 파싱
        alert_type = data.get("alertType")
        file_id = data.get("id")

        # 필수 데이터 검증
        if not file_id:
            return jsonify({"error": "Missing required field: 'id'"}), 400

        # 파일 이름 생성
        temp_file_name = f"temp_{file_id}.yaml"
        final_file_name = f"{file_id}.yaml"

        # 경로 설정
        temp_file_path = os.path.join(BASE_PATH, alert_type, temp_file_name)
        final_file_path = os.path.join(BASE_PATH, alert_type, final_file_name)

        # 임시 파일 확인
        if not os.path.exists(temp_file_path):
            return jsonify({"error": f"Temporary YAML file not found: {temp_file_path}"}), 404

        # 임시 파일 내용을 최종 파일로 저장
        with open(temp_file_path, 'r', encoding='utf-8') as temp_file:
            temp_content = temp_file.read()

        with open(final_file_path, 'w', encoding='utf-8') as final_file:
            final_file.write(temp_content)

        # 임시 파일 삭제
        os.remove(temp_file_path)

        return jsonify({"status": "OK"}), 200

    except Exception as e:
        return jsonify({"status": "FAILED", "error": str(e)}), 500

# NIST 보안 표준 개별 제어 항목 활성화 상태 설정 라우터
@app.route('/api/control/<control_id>', methods=['POST'])
def set_control_item(control_id):
    data = request.json
    status = data.get('status')  # 'ENABLED' 또는 'DISABLED'
    
    if status not in ['ENABLED', 'DISABLED']:
        return jsonify({"error": "Invalid status. Use 'ENABLED' or 'DISABLED'."}), 400

    try:
        response = set_securityhub_control_activation(control_id, status)
        return jsonify({"message": f"Control {control_id} successfully updated", "response": response}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except PermissionError as e:
        return jsonify({"error": str(e)}), 403
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 제어항목 페이지의 제어항목 리스트 제공 라우터
# metadata + status + compliance -> 제어 항목 페이지
@app.route('/api/control', methods=['GET'])
def get_control_full():
    try:
        # 쿼리 파라미터 가져오기
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('pageSize', 15))
        status_filter = request.args.get('filter[status]')
        severity_filter = request.args.get('filter[severity]')
        sort_field = request.args.get('sort[field]', 'ControlId')
        sort_order = request.args.get('sort[order]', 'asc')
        search_keyword = request.args.get('searchKeyword', '')

        print("page:", page)
        print("page_size:", page_size)
        print("status_filter:", status_filter)
        print("severity_filter:", severity_filter)
        print("sort_field:", sort_field)
        print("sort_order:", sort_order)
        print("search_keyword:", search_keyword)

        # AWS 서비스 호출
        controls, total_count = get_controls_with_compliance_results2(
            page=page,
            page_size=page_size,
            status_filter=status_filter,
            severity_filter=severity_filter,
            sort_field=sort_field,
            sort_order=sort_order,
            search_keyword=search_keyword
        )

        # 응답 데이터 생성
        response = {
            "controls": controls,
            "totalCount": total_count
        }
        return jsonify(response)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400  # 사용자에게 오류 메시지 반환
    
# 알림규칙 페이지의 제어항목 리스트 제공 라우터
# metadata + status -> 규칙 편집 페이지
@app.route('/api/notificationRule', methods=['GET'])
def get_control_with_status():
    try:
        # 쿼리 파라미터 가져오기
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('pageSize', 20))
        status_filter = request.args.get('filter[status]')
        severity_filter = request.args.get('filter[severity]')
        sort_field = request.args.get('sort[field]', 'ControlId')
        sort_order = request.args.get('sort[order]', 'asc')
        search_keyword = request.args.get('searchKeyword', '')

        # AWS 서비스 호출
        controls, total_count = get_filtered_controls_list(
            page=page,
            page_size=page_size,
            status_filter=status_filter,
            severity_filter=severity_filter,
            sort_field=sort_field,
            sort_order=sort_order,
            search_keyword=search_keyword
        )

        # 응답 데이터 생성
        response = {
            "controls": controls,
            "totalCount": total_count
        }
        return jsonify(response)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400  # 사용자에게 오류 메시지 반환

# 선택된 제어항목 리스트의 세부 정보 제공 라우터
@app.route('/api/control/details', methods=['GET'])
def get_controls_by_ids_route():
    try:
        # 요청 본문에서 controlIds 가져오기
        control_ids_json = request.args.get('controlIds', None)

        if not control_ids_json:
            raise ValueError("controlIds 파라미터가 제공되지 않았습니다.")

        control_ids = json.loads(control_ids_json)

        if not isinstance(control_ids, list) or not control_ids:
            raise ValueError("controlIds는 비어 있지 않은 배열이어야 합니다.")

        # AWS 서비스 호출
        controls = get_controls_by_ids_from_aws(control_ids)
        print(controls)

        # 응답 데이터 생성
        return jsonify({"controls": controls}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400  # 사용자에게 오류 메시지 반환
    except Exception as e:
        return jsonify({"error": "서버 오류가 발생했습니다.", "details": str(e)}), 500

# 이메일로 특정 Jira 사용자 정보 반환 라우터
@app.route('/api/jira/user', methods=['GET'])
def get_jira_user():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email parameter is required"}), 400

    try:
        user = get_jira_user_logic(email)
        return jsonify(user)
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

# 모든 Jira 사용자 정보 반환 라우터
@app.route('/api/jira/users', methods=['GET'])
def get_all_jira_users():
    try:
        return get_all_jira_users_logic()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Dashboard 페이지의 Jira 티켓 현황 통계 조회 라우터
@app.route('/api/dashboard', methods=['GET'])
def dashboard_tickets_status():
    tickets_stats = get_tickets_stats()
    return jsonify(tickets_stats)

# Dashboard 페이지의 특정 Jira 티켓 조회 라우터
@app.route('/api/dashboard/<ticket_id>', methods=['GET'])
def dashboard_ticket_details(ticket_id):
    ticket_details = get_ticket_details(ticket_id)
    
    if "error" in ticket_details:
        return jsonify(ticket_details), 500
    return jsonify(ticket_details), 200

# security hub, ES 통계 불러오기 라우터
@app.route('/api/dashboard/findings', methods=['GET'])
# @jwt_required  # 인증 데코레이터 적용
def get_dashboard_findings():
    try:
        # 1. SecurityHub 규정 준수 요약 데이터 가져오기
        control_status_counts = json.loads(get_control_status_counts2())
        
        # 2. 필터링된 보안 이슈 데이터 가져오기
        filtered_security_issues = json.loads(get_security_issues_filtered())
        
        # 3. 보안 이슈 데이터 분석 (Severity와 ControlId 종류별 분포 계산)
        analyzed_issues = json.loads(analyze_security_issues(filtered_security_issues))
        
        # 전체 결과를 통합하여 반환
        result = {
            "control_status_counts": control_status_counts,
            "analyzed_issues": analyzed_issues
        }

        # JSON 형식으로 반환
        return jsonify(result)

    except Exception as e:
        # 오류 발생 시 에러 메시지 반환
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# ASSIGNEE_FILE_PATH를 app.py의 위치에 기반하여 설정
ASSIGNEE_FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')

@app.route('/api/rules/<awsRegion>/assignees', methods=['GET'])
def get_assignees(awsRegion):
    # CSV 파일 경로
    csv_file_path = os.path.join(ASSIGNEE_FILE_PATH, f"{awsRegion}.csv")

    # 디버깅용 로그
    print(f"Looking for CSV file at: {csv_file_path}")

    assignees = []
    try:
        # CSV 파일 읽기
        with open(csv_file_path, mode='r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            print(f"CSV Headers: {reader.fieldnames}")  # 디버깅: CSV 헤더 출력
            for row in reader:
                assignees.append({
                    "SecurityControlId": row['conId'] if row['conId'] else None,
                    "assigneeId": row['assigneeId'] if row['assigneeId'] else None,
                    "assigneeName": row['assigneeName'] if row['assigneeName'] else None
        })

        if not assignees:
            return jsonify({"message": f"No assignees found in '{awsRegion}' CSV file"}), 404

        return jsonify({"assignees": assignees})

    except FileNotFoundError:
        return jsonify({"error": f"CSV file for region '{awsRegion}' not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/available-regions", methods=["GET"])
def get_available_regions():
    available_regions = [
        "us-east-1",
        "us-east-2",
        "us-west-1",
        "us-west-2",
        "ap-south-1",
        "ap-northeast-3",
        "ap-northeast-2",
        "ap-southeast-1",
        "ap-southeast-2",
        "ap-northeast-1",
        "ca-central-1",
        "cn-north-1",
        "cn-northwest-1",
        "eu-central-1",
        "eu-west-1",
        "eu-west-2",
        "eu-west-3",
        "eu-north-1",
        "sa-east-1",
    ]
    return jsonify(available_regions), 200


@app.route("/api/default-region", methods=["GET"])
def get_default_region():
    default_region = os.getenv("AWS_DEFAULT_REGION")
    return jsonify(default_region), 200


if __name__ == '__main__':
    
    print("Starting Flask server...")
    app.run(debug=True, port=5001)

