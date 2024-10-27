import os
import yaml
from collections import OrderedDict
from flask_cors import CORS
from flask import redirect, Flask, send_from_directory, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from aws_service import set_securityhub_control_activation, get_nist_controls_list
from dotenv import load_dotenv

load_dotenv()  # .env 파일에서 환경 변수 로드

app = Flask(__name__, static_folder='../react_client')
CORS(app)

# 정확한 경로 설정
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'static')
target_dir = os.path.join(os.path.dirname(__file__), 'static_yaml')

# MySQL 연결 설정
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:12345678@mysqldb.clkffsdcmvga.ap-northeast-2.rds.amazonaws.com:3306/mysqldb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 데이터베이스 초기화
db = SQLAlchemy(app)

# User 모델 정의
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<User {self.user_id}>'
    
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
    # 요청이 들어올 때마다 static 폴더를 초기화
    clear_static_folder()

    # JSON 데이터에서 'input_value' 추출 및 파싱
    json_data = request.get_json()
    if not json_data or 'input_value' not in json_data:
        return jsonify({"error": "Missing 'input_value' in request"}), 400

    yaml_text = json_data['input_value']
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
    target_path = os.path.join(target_dir, 'config.yaml')
    print("Target directory ensured:", target_dir)

    # 임시 파일을 대상 경로로 이동
    os.replace(temp_yaml_path, target_path)
    print("YAML file moved to:", target_path)
    # 저장 완료 후 메인 페이지로 리디렉션
    return redirect('/')


@app.route('/db_test')
def db_test():
    try:
        # 텍스트로 SQL 구문을 명시적으로 선언
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




# NIST 보안 표준 개별 제어 항목 상태 설정하기
@app.route('/control/<control_id>', methods=['POST'])
def set_control_item(control_id):
    data = request.json
    standards_arn = data.get('standards_arn')  # 보안 표준 ARN
    status = data.get('status')  # 'ENABLED' 또는 'DISABLED'

    response = set_securityhub_control_activation(standards_arn, control_id, status)
    return jsonify(response)


# NIST 보안 표준 리스트 가져오기
@app.route('/control', methods=['GET'])
def get_control_item_list():
    controls = get_nist_controls_list()
    return jsonify(controls)


if __name__ == '__main__':
    # 정적 폴더가 없을 시 생성
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # 데이터베이스 및 테이블 생성
    with app.app_context():
        db.create_all()  # User 및 SecurityHubFinding 테이블을 생성합니다.
        print("User and SecurityHubFinding tables created.")

        # User 테이블에 더미 데이터 삽입
        if not User.query.filter_by(user_id='testuser').first():
            dummy_user = User(user_id='testuser', password='password123')
            db.session.add(dummy_user)
            db.session.commit()
            print("Dummy user added to the database.")
        
        # SecurityHubFinding 테이블에 초기 데이터 삽입
        if not SecurityHubFinding.query.first():
            insert_securityhub_findings_data()

    print("Starting Flask server...")
    app.run(debug=True, port=5001)
