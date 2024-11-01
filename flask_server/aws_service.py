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

# 개별 제어 항목의 ARN을 동적으로 가져오는 함수
def get_control_arn(control_id, standards_subscription_arn):
    client = get_securityhub_client()
    paginator = client.get_paginator('describe_standards_controls')
    page_iterator = paginator.paginate(StandardsSubscriptionArn=standards_subscription_arn)

    for page in page_iterator:
        for control in page['Controls']:
            if control['ControlId'] == control_id:
                return control['StandardsControlArn']
    return None

# NIST 보안 표준 개별 제어 항목 활성화 설정 함수
def set_securityhub_control_activation(control_id, status):
    standards_subscription_arn = get_standards_subscription_arn()
    if not standards_subscription_arn:
        raise ValueError("NIST 표준이 활성화되어 있지 않거나 ARN을 찾을 수 없습니다.")
    
    # 개별 제어 항목의 ARN 가져오기
    control_arn = get_control_arn(control_id, standards_subscription_arn)
    if not control_arn:
        raise ValueError("제어 항목을 찾을 수 없습니다.")

    client = get_securityhub_client()
    
    try:
        # `DisabledReason`은 `DISABLED`일 때만 추가
        update_params = {
            'StandardsControlArn': control_arn,
            'ControlStatus': status
        }
        if status == 'DISABLED':
            update_params['DisabledReason'] = 'User request'

        response = client.update_standards_control(**update_params)
        return response
    
    except client.exceptions.ResourceNotFoundException:
        raise ValueError("제어 항목을 찾을 수 없습니다.")
    except client.exceptions.InvalidInputException as e:
        raise ValueError(f"잘못된 입력: {str(e)}")
    except client.exceptions.AccessDeniedException as e:
        raise PermissionError(f"권한이 거부되었습니다: {str(e)}")

# NIST 보안 표준 리스트 가져오는 함수
def get_nist_controls_list():
    standards_subscription_arn = get_standards_subscription_arn()
    if not standards_subscription_arn:
        raise ValueError("NIST 표준이 활성화되어 있지 않거나 ARN을 찾을 수 없습니다.")
    
    client = get_securityhub_client()
    response = client.describe_standards_controls(
        StandardsSubscriptionArn=standards_subscription_arn
    )
    return response.get('Controls', [])
