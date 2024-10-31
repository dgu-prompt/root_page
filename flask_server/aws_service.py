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

# 활성화된 NIST 보안 표준 ARN(standards_subscription_arn)을 동적으로 가져오는 함수
def get_standards_subscription_arn(standards_name='nist-800-53'):
    client = get_securityhub_client()
    response = client.get_enabled_standards()
    #print("Enabled standards:", response.get('StandardsSubscriptions', []))  # ARN 목록 출력
   
    for standard in response.get('StandardsSubscriptions', []):
        if standards_name in standard.get('StandardsArn', ''):
            return standard.get('StandardsSubscriptionArn')
    return None

# 활성화된 NIST 보안 표준 ARN(standards_arn)을 동적으로 가져오는 함수
def get_standards_arn(standards_name='nist-800-53'):
    client = get_securityhub_client()
    response = client.get_enabled_standards()

    for standard in response.get('StandardsSubscriptions', []):
        if standards_name in standard.get('StandardsArn', ''):
            return standard.get('StandardsArn').replace('subscription', 'standards') # StandardsArn 반환
    return None

# NIST 보안 표준 개별 제어 항목 활성화 설정 함수
def set_securityhub_control_activation(control_arn, status):
    standards_arn = get_standards_arn()
    if not standards_arn:
        raise ValueError("NIST 표준이 활성화되어 있지 않거나 ARN을 찾을 수 없습니다.")
    
    client = get_securityhub_client()
    response = client.batch_update_standards_control_associations(
        StandardsControlAssociationUpdates=[
            {
                'StandardsArn': standards_arn,
                'SecurityControlId': control_arn,
                'AssociationStatus': status,  # 'ENABLED' 또는 'DISABLED'
                'UpdatedReason': 'User request'  # 업데이트 이유 (선택 사항)
            }
        ]
    )
    return response

# NIST 보안 표준 리스트 가져오는 함수
def get_nist_controls_list():
    standards_arn = get_standards_subscription_arn()
    if not standards_arn:
        raise ValueError("NIST 표준이 활성화되어 있지 않거나 ARN을 찾을 수 없습니다.")
    
    client = get_securityhub_client()
    response = client.describe_standards_controls(
        StandardsSubscriptionArn=standards_arn
    )
    return response.get('Controls', [])
