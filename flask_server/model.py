from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

# db 객체를 정의하여 앱에서 사용할 수 있게 함
db = SQLAlchemy()

# User 모델 정의
class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<User {self.user_id}>'

    def get_id(self):
        return str(self.id)

# SecurityHubFinding 모델 정의
class SecurityHubFinding(db.Model):
    __tablename__ = 'securityhub_findings'
    findings_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    findings_name = db.Column(db.String(100), nullable=False)
    option = db.Column(db.String(50), nullable=True)

    def __repr__(self):
        return f'<SecurityHubFinding {self.findings_name}>'

# SecurityHubFinding 테이블에 초기 데이터 삽입 함수
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
    
    # 데이터 삽입
    for data in findings_data:
        finding = SecurityHubFinding(findings_name=data["findings_name"], option=data["option"])
        db.session.add(finding)
    
    db.session.commit()
    print("SecurityHub findings data inserted successfully!")


# 모델과 초기 데이터를 생성하는 함수
def initialize_db():
    db.create_all()
    print("User and SecurityHubFinding tables created.")
    
    # Dummy user 생성 -> register API로 username, password 생성
    # create_dummy_user()

    # 초기 데이터 삽입
    if not SecurityHubFinding.query.first():
        insert_securityhub_findings_data()

