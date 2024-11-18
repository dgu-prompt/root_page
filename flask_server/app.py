import os
import yaml
from collections import OrderedDict
from flask_cors import CORS
from flask import redirect, Flask, send_from_directory, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from werkzeug.security import generate_password_hash, check_password_hash
from aws_service import get_nist_filtered_controls_list, set_securityhub_control_activation, get_nist_controls_list
from model import initialize_db, User, db
from dashboard_service import get_ticket_details, get_tickets_stats
from dotenv import load_dotenv
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user


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

# 로그인 엔드포인트
@app.route('/login', methods=['POST'])
def login():
    json_data = request.get_json()

    # 필수 데이터 유효성 검사
    if not json_data:
        return jsonify({"error": "No JSON data provided"}), 400
    if 'username' not in json_data or 'password' not in json_data:
        return jsonify({"error": "Username and password required"}), 400
        
    username = json_data['username']
    password = json_data['password']
    
    # `username`을 `user_id`로 매칭해서 사용자 찾기
    user = User.query.filter_by(user_id=username).first()
    
    if not user:
            return jsonify({"error": "User not found"}), 404  # 사용자 없음
        
    # 비밀번호 체크
    if user.password != password:
        return jsonify({"error": "Invalid password"}), 401  # 비밀번호 불일치

    # 로그인 처리
    login_user(user)  # flask-login을 사용하여 로그인

    # 로그인 성공 시 username과 메시지 반환
    return jsonify({"message": "Login successful!", "username": user.user_id}), 200


    # if user and user.check_password(password):  # 해싱된 비밀번호 비교
    #     login_user(user)  # flask-login을 사용하여 로그인
    #     return jsonify({"message": "Login successful!", "username": user.user_id}), 200
    # else:
    #     return jsonify({"error": "Invalid credentials"}), 401

# 로그아웃 엔드포인트
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()  # flask-login을 사용하여 로그아웃
    return jsonify({"message": "Logged out successfully!"}), 200

# 로그인 필요로 하는 예제 라우트
@app.route('/protected')
@login_required
def protected():
    return jsonify({"message": f"Hello, {current_user.user_id}!"})

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

# NIST 보안 표준 리스트 필터링 거쳐 가져오기
@app.route('/control', methods=['GET'])
@app.route('/notificationRule', methods=['GET'])
def get_filtered_control_item_list():
    try:
        # 쿼리 파라미터 가져오기
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('pageSize', 10))
        status_filter = request.args.get('filter[status]')
        severity_filter = request.args.get('filter[severity]')
        sort_field = request.args.get('sort[field]', 'ControlId')
        sort_order = request.args.get('sort[order]', 'asc')
        search_keyword = request.args.get('searchKeyword', '')

        # AWS 서비스 호출
        controls, total_count = get_nist_filtered_controls_list(
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

# SecurityHub 규정 준수 요약 가져오기 API
@app.route('/compliance_summary/<control_id>', methods=['GET'])
def get_compliance_summary(control_id):
    try:
        summary = get_security_hub_compliance_summary(control_id)
        return jsonify(summary), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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

if __name__ == '__main__':
    
    with app.app_context():
        initialize_db()  # 데이터베이스 초기화 및 더미 사용자 생성

    print("Starting Flask server...")
    app.run(debug=True, port=5001)
