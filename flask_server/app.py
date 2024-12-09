import os
import yaml
import jwt
import shutil
import csv
from collections import OrderedDict
from flask_cors import CORS
import json
from flask import redirect, Flask, send_from_directory, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from werkzeug.security import generate_password_hash, check_password_hash
from aws_service import get_controls_by_ids_from_aws, get_controls_with_compliance_results, get_controls_with_compliance_results2, get_filtered_controls_list, set_securityhub_control_activation, get_control_status_counts
from model import initialize_db, User, db
from elasticsearch_dashboard import get_security_issues_filtered, analyze_security_issues
from dashboard_service import get_all_jira_users_logic, get_jira_user_logic, get_ticket_details, get_tickets_stats
from dotenv import load_dotenv
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import bcrypt
from datetime import datetime, timedelta
from functools import wraps
import uuid  # UUID 생성용 라이브러리


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

# JWT 토큰 생성 함수
def create_jwt_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(days=7),  # 토큰 만료 시간: 7일
        "iat": datetime.utcnow()  # 토큰 발급 시간
    }
    token = jwt.encode(payload, app.secret_key, algorithm="HS256")
    return token


# JWT 토큰 검증 함수
def verify_jwt_token(token):
    try:
        payload = jwt.decode(token, app.secret_key, algorithms=["HS256"])
        return payload  # 토큰 유효 시 payload 반환
    except jwt.ExpiredSignatureError:
        return None  # 토큰 만료
    except jwt.InvalidTokenError:
        return None  # 유효하지 않은 토큰

# JWT 인증 데코레이터
def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Authorization 헤더에서 토큰 확인
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            # JWT 토큰이 없을 때
            return jsonify({"status": "FAILED", "error": "Authentication required. Please log in."}), 401

        token = auth_header.split(" ")[1]  # Bearer 뒤의 토큰 추출

        # JWT 토큰 유효성 검증 (예시: verify_jwt_token 함수 사용)
        payload = verify_jwt_token(token)
        if not payload:
            # JWT 토큰이 유효하지 않을 때
            return jsonify({"status": "FAILED", "error": "Invalid or expired token. Please log in again."}), 401

        # 유효한 토큰일 경우 사용자 정보 추가
        request.user_id = payload['user_id']
        return f(*args, **kwargs)

    return decorated_function

# 회원가입 엔드포인트
@app.route('/register', methods=['POST'])
def register():
    json_data = request.get_json()

    if not json_data or 'username' not in json_data or 'password' not in json_data:
        return jsonify({"error": "Username and password required"}), 400

    username = json_data['username']
    password = json_data['password']

    # 사용자 중복 체크
    if User.query.filter_by(user_id=username).first():
        return jsonify({"error": "User already exists"}), 400

    # 비밀번호 해싱 (bcrypt)
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # 사용자 저장
    new_user = User(user_id=username, password=hashed_password.decode('utf-8'))  # DB에 저장하기 위해 decode
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

# 로그인 엔드포인트
@app.route('/login', methods=['POST'])
def login():
    json_data = request.get_json()

    if not json_data or 'username' not in json_data or 'password' not in json_data:
        return jsonify({"error": "Username and password required"}), 400

    username = json_data['username']
    password = json_data['password']

    # 사용자 조회
    user = User.query.filter_by(user_id=username).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    # 비밀번호 검증 (bcrypt)
    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"error": "Invalid password"}), 401

    # JWT 토큰 생성
    token = create_jwt_token(user_id=user.user_id)

    return jsonify({"message": "Login successful!", "username": user.user_id,"token": token}), 200

# jwt 적용 전 ver
'''
# 로그인 엔드포인트
@app.route('/login', methods=['POST'])
def login():
    json_data = request.get_json()

    if not json_data or 'username' not in json_data or 'password' not in json_data:
        return jsonify({"error": "Username and password required"}), 400

    username = json_data['username']
    password = json_data['password']

    # 사용자 조회
    user = User.query.filter_by(user_id=username).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    # 비밀번호 검증 (bcrypt)
    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"error": "Invalid password"}), 401

    # 로그인 처리
    login_user(user)

    return jsonify({"message": "Login successful!", "username": user.user_id}), 200
'''
# 로그아웃 엔드포인트
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()  # flask-login을 사용하여 로그아웃
    return jsonify({"message": "Logged out successfully!"}), 200

# 로그인 필요로 하는 예제 라우트
@app.route('/protected', methods=['GET'])
def protected():
    auth_header = request.headers.get('Authorization')

    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"error": "Token required"}), 401

    token = auth_header.split(" ")[1]  # Bearer 뒤의 토큰 추출
    payload = verify_jwt_token(token)

    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    return jsonify({"message": f"Hello, {payload['user_id']}! Welcome to the protected route."})


# 담당자 정보 읽기
def get_assignee_data():
    assignee_data = []
    with open(ASSIGNEE_FILE_PATH, mode='r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file, delimiter='\t')
        for row in csv_reader:
            assignee_data.append({
                "assigneeId": row['assigneeId'],
                "assigneeName": row['assigneeName']
            })
    return assignee_data

# 규칙 파일 여부 확인
def check_rule_files(alert_type, aws_region, assignee_name):
    directory = os.path.join(os.path.dirname(__file__), alert_type, aws_region)
    if not os.path.exists(directory):
        return False
    yaml_files = [file for file in os.listdir(directory) if file.endswith('.yaml')]
    # assignee_name 기반 YAML 파일 이름 탐색
    rule_file_exists = any(assignee_name in yaml_file for yaml_file in yaml_files)
    return rule_file_exists


# 정적 폴더 초기화 함수
def clear_static_folder():
    print("Clearing static folder...")
    for filename in os.listdir(app.config['UPLOAD_FOLDER']):
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.isfile(file_path):
            os.remove(file_path)
    print("Static folder cleared.")

@app.route('/')
def serve_react():
    print("Serving React index.html")
    return send_from_directory('../react_client', 'index.html')

BASE_PATH = os.path.dirname(__file__)

@app.route('/count_yaml', methods=['GET'])
def count_yaml():
    regions_data = {}  # 리전 데이터를 저장할 딕셔너리
    alert_types = ["jira", "slack"]  # 고정된 alert_type 값
    all_regions = set()  # 모든 리전 이름을 저장할 집합

    try:
        # 모든 alertType에서 유니크한 region 추출
        for alert_type in alert_types:
            alert_type_path = os.path.join(BASE_PATH, alert_type)
            if not os.path.isdir(alert_type_path):  # 디렉토리 확인
                print(f"Warning: {alert_type_path} 디렉토리가 없습니다.")
                continue

            # 해당 alert_type 디렉토리에서 리전 이름 추출
            regions = [region for region in os.listdir(alert_type_path) if os.path.isdir(os.path.join(alert_type_path, region))]
            all_regions.update(regions)  # 모든 리전 집합에 추가

        # 추출된 모든 리전에 대해 데이터를 처리
        for region in sorted(all_regions):  # 정렬된 리전 순회
            regions_data[region] = {"region": region, "count": 0, "yamlName": []}

            # 각 리전에 대해 alertType별 데이터 추가
            for alert_type in alert_types:
                region_path = os.path.join(BASE_PATH, alert_type, region)
                if not os.path.isdir(region_path):  # 경로가 없으면 건너뜀
                    continue

                try:
                    # region 내부의 YAML 파일 목록
                    yaml_files = [f for f in os.listdir(region_path) if f.endswith('.yaml')]
                    yaml_count = len(yaml_files)  # YAML 파일 개수

                    # YAML 파일에서 name 값 및 description 값 추출
                    for yaml_file in yaml_files:
                        yaml_path = os.path.join(region_path, yaml_file)
                        try:
                            with open(yaml_path, 'r', encoding='utf-8') as file:
                                yaml_content = yaml.safe_load(file)
                                name = yaml_content.get('name', 'Unknown Rule Name')
                                description = yaml_content.get('description', 'No description available')
                                # YAML 데이터를 JSON 형식으로 저장
                                regions_data[region]["yamlName"].append({
                                    "filename": yaml_file,
                                    "name": name,
                                    "alertType": alert_type,
                                    "description": description
                                })
                        except FileNotFoundError:
                            print(f"Error: File not found - {yaml_path}")
                        except yaml.YAMLError:
                            print(f"Error: Invalid YAML format - {yaml_path}")

                    # 해당 리전의 YAML 파일 총 개수 업데이트
                    regions_data[region]["count"] += yaml_count

                except Exception as e:
                    print(f"Error processing region: {region}, alertType: {alert_type}. Exception: {e}")

    except Exception as e:
        return jsonify({"error": f"Failed to process base path {BASE_PATH}. Exception: {e}"}), 500

    # JSON 응답 반환
    return jsonify(list(regions_data.values()))

@app.route('/read_yaml', methods=['POST'])
def read_yaml():
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

        # YAML 파일 경로 설정
        yaml_path = os.path.join(BASE_PATH, alert_type, region, file_name)

        if not os.path.exists(yaml_path):
            return jsonify({"error": f"YAML file not found: {yaml_path}"}), 404

        # YAML 파일 읽기
        with open(yaml_path, 'r', encoding='utf-8') as file:
            yaml_content = yaml.safe_load(file)

         # BaseRule 및 JiraRule 필드 구성
        response_data = {
            "id": file_id,
            "name": yaml_content.get("name", "Unknown Rule Name"),
            "description": yaml_content.get("description", "No description available"),
            "alertType": alert_type,
            "region": region,
            "controlIds": yaml_content.get("controlIds", []),
            "alertSubject": yaml_content.get("alertSubject"),
            "alertText": yaml_content.get("alertText", ""),
            "yamlPreview": "",
        }

        # JiraRule 추가 필드
        if alert_type == "jira":
            response_data.update({
                "project": yaml_content.get("jira_project", "Unknown Project"),
                "assignee": yaml_content.get("jira_assignee", "Unassigned"),
                "priority": yaml_content.get("jira_priority")
            })

        # JSON 응답 반환
        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# Default YAML 파일 경로
DEFAULT_PATHS = {
    "jira": os.path.join(BASE_PATH, "default", "jira_default.yaml"),
    "slack": os.path.join(BASE_PATH, "default", "slack_default.yaml"),
}

# default yaml 파일 복제 -> 복사 후 생성 api
@app.route('/add_rule_yaml', methods=['POST'])
# @jwt_required  # 인증 데코레이터 적용
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
        destination_dir = f"{alert_type}/{region}"
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

@app.route('/preview_yaml', methods=['POST'])
def preview_yaml():
    try:
        # 요청 데이터 파싱
        data = request.json.get("yamlContents", {})
        alert_type = data.get("alertType")
        region = data.get("region")
        file_id = data.get("id")

        # 필수 데이터 검증
        if not alert_type or not region or not file_id:
            return jsonify({"error": "Missing required fields: 'alertType', 'region', 'id'"}), 400

        # 파일 이름 생성
        file_name = f"{file_id}.yaml"
        
        # 기존 YAML 파일 경로
        yaml_path = os.path.join(BASE_PATH, alert_type, region, file_name)

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

        # filter 수정
        control_ids = data.get("controlIds", [])
        if control_ids:
            yaml_content["filter"][-1]["terms"]["aws.securityhub_findings.generator.id.keyword"] = [
                f"security-control/{control_id}" for control_id in control_ids
            ]
            
        # 순서 유지
        yaml_content = dict(yaml_content)

        # 임시 YAML 파일 생성
        temp_file_name = f"temp_{file_name}"
        temp_yaml_path = os.path.join(BASE_PATH, alert_type, region, temp_file_name)

        with open(temp_yaml_path, 'w', encoding='utf-8') as temp_file:
            yaml.dump(yaml_content, temp_file, default_flow_style=False, allow_unicode=True, sort_keys=False)

        # 수정된 YAML 파일 내용을 문자열로 읽기
        with open(temp_yaml_path, 'r', encoding='utf-8') as temp_file:
            yaml_preview = temp_file.read()

        # 응답 데이터 구성
        response_data = {"yamlPreview": yaml_preview}

        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
    
@app.route('/final_submit_yaml', methods=['POST'])
def final_submit_yaml():
    try:
        # 요청 데이터 파싱
        data = request.get_json()
        alert_type = data.get("alertType")
        region = data.get("region")
        file_id = data.get("id")

        # 필수 데이터 검증
        if not file_id:
            return jsonify({"error": "Missing required field: 'id'"}), 400

        # 파일 이름 생성
        temp_file_name = f"temp_{file_id}.yaml"
        final_file_name = f"{file_id}.yaml"

        # 경로 설정
        temp_file_path = os.path.join(BASE_PATH, alert_type, region, temp_file_name)
        final_file_path = os.path.join(BASE_PATH, alert_type, region, final_file_name)

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


'''
@app.route('/test', methods=['POST'])
def save_yaml():
    # static 폴더가 없으면 생성
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # 요청이 들어올 때마다 static 폴더를 초기화
    clear_static_folder()

    # 파일명을 문자열로 받아옴
    file_name = request.form.get('file_name')
    # 파일명에 '.yaml' 확장자 추가
    file_name += '.yaml'
    if not file_name:
        return jsonify({"error": "Missing 'file_name' in request"}), 400

    # JSON 데이터에서 'input_value' 추출 및 파싱
    json_data = request.get_json()
    if not json_data or 'input_value' not in json_data:
        return jsonify({"error": "Missing 'input_value' in JSON data"}), 400

    yaml_text = json_data['input_value']
    print(f"Received file name: {file_name}")
    print("Received raw YAML text:", yaml_text)

    # YAML 텍스트를 Python 객체로 파싱 (순서 유지)
    try:
        yaml_data = yaml.load(yaml_text, Loader=yaml.FullLoader)  # FullLoader로 로드
        print("Parsed YAML data with preserved order:", yaml_data)
    except yaml.YAMLError as e:
        print("YAML parsing error:", e)
        return jsonify({"error": "Invalid YAML format", "details": str(e)}), 400

    # YAML 데이터를 임시 파일에 정리된 형태로 저장 (순서 유지, 정렬 안 함)
    temp_yaml_path = os.path.join(app.config['UPLOAD_FOLDER'], 'temp.yaml')
    with open(temp_yaml_path, 'w', encoding='utf-8') as file:
        yaml.dump(yaml_data, file, allow_unicode=True, default_flow_style=False, sort_keys=False)
        print("Formatted YAML file saved at:", temp_yaml_path)

    # 대상 경로가 없으면 생성
    os.makedirs(target_dir, exist_ok=True)
    target_path = os.path.join(target_dir, file_name)
    print("Target directory ensured:", target_dir)
    
    # 임시 파일을 대상 경로로 이동
    os.replace(temp_yaml_path, target_path)
    print("YAML file moved to:", target_path)

    return redirect('/')
'''
# /load_yaml 경로에서 static_yaml 폴더의 yaml 파일들을 불러오는 엔드포인트 추가

'''
호출되는 json 형태 예시는 아래와 같습니당~
{
  "yaml_files": [
    {
      "config.yaml": {
        "key1": "value1",
        "key2": "value2"
      }
    },
    {
      "settings.yaml": {
        "setting1": "optionA",
        "setting2": "optionB"
      }
    }
  ]
}
'''
'''
@app.route('/load_yaml', methods=['GET'])
def load_yaml_files():
    yaml_files = []
    for filename in os.listdir(target_dir):
        if filename.endswith('.yaml'):
            file_path = os.path.join(target_dir, filename)
            with open(file_path, 'r', encoding='utf-8') as file:
                yaml_content = yaml.safe_load(file)
                yaml_files.append({filename: yaml_content})
    return jsonify({"yaml_files": yaml_files})

@app.route('/db_test')
def db_test():
    try:
        db.session.execute(text("SELECT 1"))
        return "MySQL Database Connected Successfully!"
    except Exception as e:
        return f"Error connecting to MySQL Database: {e}"
'''   

# NIST 보안 표준 개별 제어 항목 활성화 상태 설정하기
@app.route('/control/<control_id>', methods=['POST'])
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
        
# # NIST 보안 표준 리스트 가져오기
# @app.route('/control', methods=['GET'])
# @app.route('/notificationRule', methods=['GET'])
# def get_control_item_list():
#     try:
#         controls = get_nist_controls_list()
#         return jsonify(controls)
#     except ValueError as e:
#         return jsonify({"error": str(e)}), 400  # 사용자에게 오류 메시지 반환

# metadata + status + compliance -> 제어 항목 페이지
@app.route('/control', methods=['GET'])
def get_control_full():
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
        controls, total_count = get_controls_with_compliance_results(
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
        return jsonify(controls)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400  # 사용자에게 오류 메시지 반환


@app.route('/controlss', methods=['GET'])
def get_control_full2():
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
    

# metadata + status -> 규칙 편집 페이지
@app.route('/notificationRule', methods=['GET'])
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

@app.route('/control/details', methods=['GET'])
def get_controls_by_ids_route():
    try:
        # 요청 본문에서 controlIds 가져오기
        request_data = request.get_json()
        control_ids = request_data.get('controlIds', [])

        if not control_ids:
            raise ValueError("controlIds 배열이 비어 있습니다.")

        # AWS 서비스 호출
        controls = get_controls_by_ids_from_aws(control_ids)

        # 응답 데이터 생성
        return jsonify({"controls": controls}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400  # 사용자에게 오류 메시지 반환
    except Exception as e:
        return jsonify({"error": "서버 오류가 발생했습니다.", "details": str(e)}), 500

@app.route('/jira/user', methods=['GET'])
def get_jira_user():
    """
    특정 이메일로 Jira 사용자 정보 반환
    Request: /jira/user?email=<email>
    Response: {email, name, avatar}
    """
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email parameter is required"}), 400

    try:
        user = get_jira_user_logic(email)
        return jsonify(user)
    except ValueError as e:
        return jsonify({"error": str(e)}), 404


@app.route('/jira/users', methods=['GET'])
def get_all_jira_users():
    """
    모든 Jira 사용자 정보 반환
    Request: /jira/users
    Response: [{email, name, avatar}, ...]
    """
    try:
        return get_all_jira_users_logic()
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Dashboard에서 Jira 티켓 현황 통계 조회
@app.route('/dashboard', methods=['GET'])
def dashboard_tickets_status():
    tickets_stats = get_tickets_stats()
    return jsonify(tickets_stats)

# Dashboard에서 특정 Jira 티켓 조회
@app.route('/dashboard/<ticket_id>', methods=['GET'])
def dashboard_ticket_details(ticket_id):
    ticket_details = get_ticket_details(ticket_id)
    
    if "error" in ticket_details:
        return jsonify(ticket_details), 500
    
    return jsonify(ticket_details), 200

# # SecurityHub 규정 준수 요약 가져오기 API
# @app.route('/compliance_summary/<control_id>', methods=['GET'])
# def get_compliance_summary(control_id):
#     try:
#         summary = get_security_hub_compliance_summary(control_id)
#         return jsonify(summary), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# sec hub, ES 통계 불러오는 API. 향후 JIRA 대시보드 API와 합쳐야 함
@app.route('/dashboard/findings', methods=['GET'])
# @jwt_required  # 인증 데코레이터 적용
def get_dashboard_findings():
    try:
        # 1. SecurityHub 규정 준수 요약 데이터 가져오기
        control_status_counts = json.loads(get_control_status_counts())
        
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
# # NIST 보안 표준 개별 제어 항목 세부 정보 불러오는 API
# @app.route('/control/<control_id>', methods=['GET'])
# @login_required
# def get_control_item(control_id):
#     try:
#         control_details = get_control_details(control_id)
#         return jsonify({"control_details": control_details}), 200
#     except ValueError as e:
#         return jsonify({"error": str(e)}), 404
#     except Exception as e:
#         return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# 일단은 독립적인 API로 구성하여 해당 controlId의 담당자 출력하는 함수 구성. 향후 제어항목 불러오는 API와 결합해야함

# ASSIGNEE_FILE_PATH를 app.py의 위치에 기반하여 설정
ASSIGNEE_FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')

@app.route('/rules/<awsRegion>/assignees', methods=['GET'])
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
    
    
if __name__ == '__main__':
    
    with app.app_context():
        initialize_db()  # 데이터베이스 초기화 및 더미 사용자 생성

    print("Starting Flask server...")
    app.run(debug=True, port=5001)
