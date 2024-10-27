import boto3
import os

# AWS 세션 생성 함수
def create_session():
    return boto3.Session(
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name=os.getenv('AWS_DEFAULT_REGION')
    )

# SecurityHub 클라이언트 생성
def get_securityhub_client():
    session = create_session()
    return session.client('securityhub')

# AWS Config 클라이언트 생성
def get_config_client():
    session = create_session()
    return session.client('config')

# 보안 표준 제어 항목 활성화 설정 함수
def set_securityhub_control_activation(control_arn, status):
    standards_arn = 'arn:aws:securityhub:ap-northeast-2:060673280142:standards/NIST'  # NIST 표준의 ARN
    client = get_securityhub_client()
    response = client.batch_update_standards_control_associations(
        StandardsControlAssociationsUpdateRequest=[
            {
                'StandardsArn': standards_arn,
                'SecurityControlId': control_arn,
                'AssociationStatus': status  # 'ENABLED' 또는 'DISABLED'
            }
        ]
    )
    return response

# NIST 보안 표준 리스트 가져오는 함수
def get_nist_controls_list():
    client = get_securityhub_client()
    response = client.describe_standards_controls(
        StandardsArn='arn:aws:securityhub:ap-northeast-2:060673280142:standards/NIST'  # NIST 표준의 ARN
    )
    return response.get('Controls', [])
