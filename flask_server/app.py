import os
import yaml
from collections import OrderedDict
from flask_cors import CORS
from flask import redirect, Flask, send_from_directory, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from werkzeug.security import generate_password_hash, check_password_hash
from aws_service import set_securityhub_control_activation, get_nist_controls_list
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

# 데이터베이스 초기화
db = SQLAlchemy(app)

# User 모델 정의
class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<User {self.user_id}>'

    def get_id(self):
        return str(self.id)

    # # 비밀번호 해싱을 통한 설정
    # def set_password(self, password):
    #     self.password = generate_password_hash(password)

    # # 비밀번호 확인 메서드 추가
    # def check_password(self, password):
    #     return check_password_hash(self.password, password)


# flask-login 사용자 로드 함수
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# 로그인 엔드포인트
@app.route('/login', methods=['POST'])
def login():
    json_data = request.get_json()
    if not json_data or 'user_id' not in json_data or 'password' not in json_data:
        return jsonify({"error": "User ID and password required"}), 400

    user_id = json_data['user_id']
    password = json_data['password']
    
    # 사용자 확인
    user = User.query.filter_by(user_id=user_id, password=password).first()
    if user:
        login_user(user)  # flask-login을 사용하여 로그인
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

    # # 사용자 확인 - seceretkey 사용
    # user = User.query.filter_by(user_id=user_id).first()
    # if user and user.check_password(password):  # 해싱된 비밀번호 비교
    #     login_user(user)  # flask-login을 사용하여 로그인
    #     return jsonify({"message": "Login successful!"}), 200
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

# SecurityHubFinding 모델 정의
class SecurityHubFinding(db.Model):
    __tablename__ = 'securityhub_findings'
    findings_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    findings_name = db.Column(db.String(100), nullable=False)
    option = db.Column(db.String(50), nullable=True)

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
    
# SecurityHubFinding 테이블에 초기 데이터 삽입
def insert_securityhub_findings_data():
    findings_data = [
        {"findings_name": "aws.securityhub_findings.aws_account_id", "option": None},
        {"findings_name": "aws.securityhub_findings.workflow.state", "option": "NEW"},
        {"findings_name": "aws.securityhub_findings.workflow.state", "option": "ASSIGNED"},
        {"findings_name": "aws.securityhub_findings.workflow.state", "option": "IN_PROGRESS"},
        {"findings_name": "aws.securityhub_findings.workflow.state", "option": "DEFERRED"},
        {"findings_name": "aws.securityhub_findings.workflow.state", "option": "RESOLVED"},
        {"findings_name": "aws.securityhub_findings.resources.Type", "option": None},
        {"findings_name": "aws.securityhub_findings.region", "option": "ap-northeast-1"},
        {"findings_name": "aws.securityhub_findings.region", "option": "ap-northeast-2"},
        {"findings_name": "aws.securityhub_findings.region", "option": "us-east-1"},
        {"findings_name": "aws.securityhub_findings.region", "option": "us-west-2"},
        {"findings_name": "aws.securityhub_findings.description", "option": None},
        {"findings_name": "aws.securityhub_findings.severity.label", "option": "INFORMATIONAL"},
        {"findings_name": "aws.securityhub_findings.severity.label", "option": "LOW"},
        {"findings_name": "aws.securityhub_findings.severity.label", "option": "MEDIUM"},
        {"findings_name": "aws.securityhub_findings.severity.label", "option": "HIGH"},
        {"findings_name": "aws.securityhub_findings.severity.label", "option": "CRITICAL"},
        {"findings_name": "aws.securityhub_findings.workflow.status", "option": "NEW"},
        {"findings_name": "aws.securityhub_findings.workflow.status", "option": "NOTIFIED"},
        {"findings_name": "aws.securityhub_findings.workflow.status", "option": "RESOLVED"},
        {"findings_name": "aws.securityhub_findings.workflow.status", "option": "SUPPRESSED"},
        {"findings_name": "aws.securityhub_findings.title", "option": None},
    ]
    
    for data in findings_data:
        finding = SecurityHubFinding(findings_name=data["findings_name"], option=data["option"])
        db.session.add(finding)
    
    db.session.commit()
    print("SecurityHub findings data inserted successfully!")

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
        
# NIST 보안 표준 리스트 가져오기
@app.route('/control', methods=['GET'])
def get_control_item_list():
    try:
        controls = get_nist_controls_list()
        return jsonify(controls)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400  # 사용자에게 오류 메시지 반환


if __name__ == '__main__':
    
    with app.app_context():
        db.create_all()
        print("User and SecurityHubFinding tables created.")
        
        # Dummy user 생성 시 비밀번호 해싱
        if not User.query.filter_by(user_id='testuser6').first():
            
            dummy_user = User(user_id='testuser6', password='1234')  # 해싱 없이 저장
            # dummy_user = User(user_id='testuser5')
            # dummy_user.set_password('1234')  # 해싱된 비밀번호 저장
            db.session.add(dummy_user)
            db.session.commit()
            print("Dummy user 'testuser6' with hashed password added to the database.")

        if not SecurityHubFinding.query.first():
            insert_securityhub_findings_data()

    print("Starting Flask server...")
    app.run(debug=True, port=5001)
