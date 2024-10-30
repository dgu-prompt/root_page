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
app.secret_key = os.getenv("SECRET_KEY", "supersecretkey")  # 세션 관리를 위한 시크릿 키 설정
CORS(app)

# flask-login 초기화
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# 정확한 경로 설정
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'static')
target_dir = os.path.join(os.path.dirname(__file__), 'static_yaml')

# MySQL 연결 설정 (새로운 엔드포인트 사용)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:vmfhavmxm@mysqldb2.clkffsdcmvga.ap-northeast-2.rds.amazonaws.com:3306/mysqldb2'
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
    clear_static_folder()
    json_data = request.get_json()
    if not json_data or 'input_value' not in json_data:
        return jsonify({"error": "Missing 'input_value' in request"}), 400

    yaml_text = json_data['input_value']
    print("Received raw YAML text:", yaml_text)

    try:
        yaml_data = yaml.load(yaml_text, Loader=yaml.FullLoader)
        print("Parsed YAML data with preserved order:", yaml_data)
    except yaml.YAMLError as e:
        print("YAML parsing error:", e)
        return jsonify({"error": "Invalid YAML format", "details": str(e)}), 400

    temp_yaml_path = os.path.join(app.config['UPLOAD_FOLDER'], 'temp.yaml')
    with open(temp_yaml_path, 'w', encoding='utf-8') as file:
        yaml.dump(yaml_data, file, allow_unicode=True, default_flow_style=False, sort_keys=False)
        print("Formatted YAML file saved at:", temp_yaml_path)

    os.makedirs(target_dir, exist_ok=True)
    target_path = os.path.join(target_dir, 'config.yaml')
    print("Target directory ensured:", target_dir)
    os.replace(temp_yaml_path, target_path)
    print("YAML file moved to:", target_path)
    return redirect('/')

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
        # 추가 데이터 생략...
    ]
    
    for data in findings_data:
        finding = SecurityHubFinding(findings_name=data["findings_name"], option=data["option"])
        db.session.add(finding)
    
    db.session.commit()
    print("SecurityHub findings data inserted successfully!")

@app.route('/control/<control_id>', methods=['POST'])
def set_control_item(control_id):
    data = request.json
    standards_arn = data.get('standards_arn')
    status = data.get('status')
    response = set_securityhub_control_activation(standards_arn, control_id, status)
    return jsonify(response)

@app.route('/control', methods=['GET'])
def get_control_item_list():
    controls = get_nist_controls_list()
    return jsonify(controls)

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    with app.app_context():
        db.create_all()
        print("User and SecurityHubFinding tables created.")
        
        if not User.query.filter_by(user_id='testuser').first():
            dummy_user = User(user_id='testuser', password='1234')  # 해싱 없이 저장
            db.session.add(dummy_user)
            db.session.commit()
            print("Dummy user 'testuser' with plain password '1234' added to the database.")

        if not SecurityHubFinding.query.first():
            insert_securityhub_findings_data()

    print("Starting Flask server...")
    app.run(debug=True, port=5001)
