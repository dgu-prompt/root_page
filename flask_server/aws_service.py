import boto3
import os
import json
from flask import Flask, jsonify
from dotenv import load_dotenv
load_dotenv()  # .env 파일 로드

# AWS 세션 생성 함수
def create_session():
    return boto3.Session(
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name=os.getenv('AWS_DEFAULT_REGION', 'ap-northeast-2')  # 기본값을 서울 리전으로 설정
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

# NIST 보안 표준 리스트 가져와 필터링 거쳐 제공하는 함수
def get_nist_filtered_controls_list(page, page_size, status_filter, severity_filter, sort_field, sort_order, search_keyword):
    standards_subscription_arn = get_standards_subscription_arn()
    if not standards_subscription_arn:
        raise ValueError("NIST 표준이 활성화되어 있지 않거나 ARN을 찾을 수 없습니다.")

    client = get_securityhub_client()
    response = client.describe_standards_controls(
        StandardsSubscriptionArn=standards_subscription_arn
    )

    controls = response.get('Controls', [])

    # Compliance 상태 확인 및 필터링
    for control in controls:
        control_id = control.get('ControlId')
        findings_response = client.get_findings(
            Filters={
                'ProductFields': [{'Key': 'ControlId', 'Value': control_id, 'Comparison': 'EQUALS'}]
            }
        )
        findings = findings_response.get('Findings', [])
        
        # total, failed check 개수 세기
        total_checks = len(findings)
        failed_checks = sum(1 for finding in findings if finding.get('Compliance', {}).get('Status') == 'FAILED')

        control['failedChecks'] = failed_checks
        control['totalChecks'] = total_checks
        control['ComplianceStatus'] = 'FAILED' if failed_checks > 0 else 'PASSED'

        
        # Debug log to confirm values
        print(f"Debug - Control ID: {control_id}, Total Checks: {total_checks}, Failed Checks: {failed_checks}")

    # 필터 적용
    if status_filter:
        controls = [c for c in controls if c.get('ControlStatus') == status_filter]
    if severity_filter:
        controls = [c for c in controls if c.get('SeverityRating') == severity_filter]
    if search_keyword:
        controls = [c for c in controls if search_keyword.lower() in c.get('Title', '').lower()]
       
    # 정렬 적용
    reverse_order = (sort_order == 'desc')
    controls = sorted(controls, key=lambda x: x.get(sort_field, ''), reverse=reverse_order)

    # 페이지네이션 적용
    total_count = len(controls)
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    paginated_controls = controls[start_index:end_index]

    # 반환할 데이터 필터링
    filtered_controls = [
        {
            "SecurityControlId": control.get("ControlId"),
            "Title": control.get("Title"),
            "Description": control.get("Description"),
            "SeverityRating": control.get("SeverityRating"),
            "SecurityControlStatus": control.get("ControlStatus"),
            "controlStatus": control.get("ComplianceStatus"),
            "failedChecks": control.get("FailedFindingsCount", 0),
            "totalChecks": control.get("TotalFindingsCount", 0),
            "assignee": control.get("Assignee", "") # 아직 assignee 불러오는 로직 없음
        }
        for control in paginated_controls
    ]
    return filtered_controls, total_count
    

# NIST 보안 표준 리스트 가져오는 함수
# 그간 정의된 함수에는 PASSED, FAILED 상태(compliance)를 나타내는 함수가 없었기에 새롭게 정의.
# 필요하다면 기존 함수와 통합 가능# NIST 보안 표준 제어 항목 목록 가져오기# NIST 보안 표준 제어 항목 목록 가져오기
def get_nist_controls_list_with_compliance():
    standards_subscription_arn = get_standards_subscription_arn()
    if not standards_subscription_arn:
        raise ValueError("NIST 표준이 활성화되어 있지 않거나 ARN을 찾을 수 없습니다.")
    
    client = get_securityhub_client()
    controls = client.describe_standards_controls(
        StandardsSubscriptionArn=standards_subscription_arn
    ).get('Controls', [])
    
    # 각 제어 항목의 ComplianceStatus 확인
    for control in controls:
        control_id = control.get('ControlId')
        findings = client.get_findings(
            Filters={
                'ComplianceStatus': [{'Value': 'PASSED', 'Comparison': 'EQUALS'}],
                'ProductFields': [{'Key': 'ControlId', 'Value': control_id, 'Comparison': 'EQUALS'}]
            }
        ).get('Findings', [])
        
        control['ComplianceStatus'] = 'PASSED' if findings else 'FAILED'
    
    # 필요한 필드만 추출 및 ControlId 기준으로 정렬
    filtered_controls = sorted(
        [
            {
                "StandardsControlArn": control.get("StandardsControlArn"),
                "ControlStatus": control.get("ControlStatus"),
                "ControlStatusUpdatedAt": control.get("ControlStatusUpdatedAt"),
                "ControlId": control.get("ControlId"),
                "SeverityRating": control.get("SeverityRating"),
                "ComplianceStatus": control.get("ComplianceStatus")
            }
            for control in controls
        ],
        key=lambda x: x["ControlId"]  # ControlId로 정렬
    )
    
    return json.dumps(filtered_controls, indent=4, default=str)

# SecurityHub 규정 준수 요약 가져오기 함수
def get_control_status_counts():
    try:
        # NIST 표준 목록을 가져옴
        controls = get_nist_controls_list_with_compliance()
        
        # 각 상태별 갯수를 셈
        disabled_count = 0
        enabled_count = 0
        passed_count = 0
        
        for control in controls:
            # ControlStatus가 'DISABLED'인 항목 수 세기
            if control.get('ControlStatus') == 'DISABLED':
                disabled_count += 1
            
            # ControlStatus가 'ENABLED'인 항목 수 세기
            if control.get('ControlStatus') == 'ENABLED':
                enabled_count += 1
            
            # ComplianceStatus가 'PASSED'인 항목 수 세기
            if control.get('ComplianceStatus', '') == 'PASSED':
                passed_count += 1
        data = [
            {
            "disabled_count": disabled_count,
            "enabled_count": enabled_count,
            "passed_count": passed_count
        }
        ]

        # 결과 반환
        return json.dumps(data, indent=4)
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

#print(get_nist_controls_list())
