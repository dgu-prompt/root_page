import boto3
import os
import json
from flask import Flask, jsonify
from dotenv import load_dotenv
from math import ceil
import time
load_dotenv()  # .env 파일 로드

# AWS 세션 생성
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

# 활성화된 NIST 보안 표준 ARN(standards_subscription_arn) 동적으로 가져오기
def get_standards_subscription_arn(standards_name = 'nist-800-53'):
    client = get_securityhub_client()
    response = client.get_enabled_standards()
   
    for standard in response.get('StandardsSubscriptions', []):
        if standards_name in standard.get('StandardsArn', ''):
            return standard.get('StandardsSubscriptionArn')
    return None

# 개별 제어 항목의 ARN 동적으로 가져오기
def get_control_arn(control_id, standards_subscription_arn):
    client = get_securityhub_client()
    paginator = client.get_paginator('describe_standards_controls')
    page_iterator = paginator.paginate(StandardsSubscriptionArn = standards_subscription_arn)

    for page in page_iterator:
        for control in page['Controls']:
            if control['ControlId'] == control_id:
                return control['StandardsControlArn']
    return None

# NIST 보안 표준 개별 제어 항목 활성화 설정
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

# NIST 보안 표준 리스트 가져오기
def get_controls_list():
    standards_subscription_arn = get_standards_subscription_arn()
    if not standards_subscription_arn:
        raise ValueError("NIST 표준이 활성화되어 있지 않거나 ARN을 찾을 수 없습니다.")
    
    client = get_securityhub_client()
    response = client.describe_standards_controls(
        StandardsSubscriptionArn = standards_subscription_arn
    )
    return response.get('Controls', [])

# NIST 보안 표준 리스트 가져와 필터링 거쳐 제공
# metadata + status
def get_filtered_controls_list(page, page_size, status_filter, severity_filter, sort_field, sort_order, search_keyword):
    standards_subscription_arn = get_standards_subscription_arn()
    if not standards_subscription_arn:
        raise ValueError("NIST 표준이 활성화되어 있지 않거나 ARN을 찾을 수 없습니다.")

    client = get_securityhub_client()
    controls = []  # 모든 제어 항목 저장
    next_token = None  # 초기값 None
    
    # API 호출 반복 처리 (페이징)
    while True:
        if next_token:  # 다음 페이지가 있는 경우
            response = client.describe_standards_controls(
                StandardsSubscriptionArn=standards_subscription_arn,
                NextToken=next_token  # `NextToken` 포함
            )
        else:  # 첫 번째 호출인 경우
            response = client.describe_standards_controls(
                StandardsSubscriptionArn=standards_subscription_arn
            )
        
        controls.extend(response.get('Controls', []))
        next_token = response.get('NextToken')  # 다음 페이지 토큰 갱신
        if not next_token:  # 더 이상 페이지가 없으면 종료
            break

    # 필터 적용
    if status_filter:
        controls = [c for c in controls if c.get('ControlStatus') == status_filter]
    if severity_filter:
        controls = [c for c in controls if c.get('SeverityRating') == severity_filter]
    if search_keyword:
        controls = [c for c in controls if search_keyword.lower() in c.get('ControlId', '').lower()]
       
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
            "controlId": control.get("ControlId"),
            "title": control.get("Title"),
            "description": control.get("Description"),
            "remediationUrl": control.get("RemediationUrl"),
            "severity": control.get("SeverityRating"),
            "controlStatus": control.get("ControlStatus")
        }
        for control in paginated_controls
    ]
    return filtered_controls, total_count

# NIST 보안 표준 리스트 가져와 필터링 거쳐 제공
# metadata + status + compliance
def get_controls_with_compliance_results2(
    page, page_size, status_filter, severity_filter, sort_field, sort_order, search_keyword
):
    # 표준 ARN 가져오기
    standards_subscription_arn = get_standards_subscription_arn()
    if not standards_subscription_arn:
        raise ValueError("NIST 표준이 활성화되어 있지 않거나 ARN을 찾을 수 없습니다.")

    client = get_securityhub_client()
    controls = []
    next_token = None

    # 초기 메타데이터 수집 (페이징 처리)
    while True:
        if next_token:  # 다음 페이지가 있는 경우
            response = client.describe_standards_controls(
                StandardsSubscriptionArn=standards_subscription_arn,
                NextToken=next_token  # `NextToken` 포함
            )
        else:  # 첫 번째 호출인 경우
            response = client.describe_standards_controls(
                StandardsSubscriptionArn=standards_subscription_arn
            )
        controls.extend(response.get("Controls", []))
        next_token = response.get("NextToken")
        if not next_token:
            break

    # 1. 필터링
    if status_filter:
        controls = [c for c in controls if c.get("ControlStatus") == status_filter]
    if severity_filter:
        controls = [c for c in controls if c.get("SeverityRating") == severity_filter]
    if search_keyword:
        controls = [c for c in controls if search_keyword.lower() in c.get("ControlId", "").lower()]

    # 2. 정렬
    reverse_order = sort_order == "desc"
    controls = sorted(controls, key=lambda x: x.get(sort_field, ""), reverse=reverse_order)

    # 3. 페이지네이션
    total_count = len(controls)
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    paginated_controls = controls[start_index:end_index]

    # 4. `get_findings`로 상세 데이터 추가
    for control in paginated_controls:
        control_id = control.get("ControlId")
        findings_response = client.get_findings(
            Filters={
                "ComplianceSecurityControlId": [{"Value": control_id, "Comparison": "EQUALS"}],
                "RecordState": [{"Value": "ACTIVE", "Comparison": "EQUALS"}],
            }
        )
        findings = findings_response.get("Findings", [])
        total_checks = len(findings)
        failed_checks = sum(
            1 for finding in findings if finding.get("Compliance", {}).get("Status") == "FAILED"
        )

        control["failedChecks"] = failed_checks
        control["totalChecks"] = total_checks
        control["ComplianceStatus"] = "FAILED" if failed_checks > 0 else "PASSED"

    # 5. 최종 반환 데이터 구성
    filtered_controls = [
        {
            "controlId": control.get("ControlId"),
            "title": control.get("Title"),
            "description": control.get("Description"),
            "remediationUrl": control.get("RemediationUrl"),
            "severity": control.get("SeverityRating"),
            "controlStatus": control.get("ControlStatus"),
            "complianceStatus": control.get("ComplianceStatus"),
            "failedChecks": control.get("failedChecks", 0),
            "totalChecks": control.get("totalChecks", 0),
        }
        for control in paginated_controls
    ]

    return filtered_controls, total_count
    
# 특정 controlId 리스트에 대한 데이터 반환
def get_controls_by_ids_from_aws(control_ids):
    standards_subscription_arn = get_standards_subscription_arn()
    if not standards_subscription_arn:
        raise ValueError("NIST 표준이 활성화되어 있지 않거나 ARN을 찾을 수 없습니다.")

    client = get_securityhub_client()
    controls = []  # 특정 제어 항목 저장
    next_token = None  # 초기값 None

    while True:
        if next_token:  # 다음 페이지가 있는 경우
            response = client.describe_standards_controls(
                StandardsSubscriptionArn=standards_subscription_arn,
                NextToken=next_token
            )
        else:  # 첫 번째 호출인 경우
            response = client.describe_standards_controls(
                StandardsSubscriptionArn=standards_subscription_arn
            )

        # 요청한 controlId만 필터링
        controls.extend(
            control for control in response.get('Controls', [])
            if control.get('ControlId') in control_ids
        )

        next_token = response.get('NextToken')  # 다음 페이지 토큰 갱신
        if not next_token:  # 더 이상 페이지가 없으면 종료
            break

    # 반환할 데이터 필터링
    filtered_controls = [
        {
            "controlId": control.get("ControlId"),
            "title": control.get("Title"),
            "description": control.get("Description"),
            "remediationUrl": control.get("RemediationUrl"),
            "severity": control.get("SeverityRating"),
            "controlStatus": control.get("ControlStatus")
        }
        for control in controls
    ]
    return filtered_controls



# NIST 보안 표준 리스트 가져오는 함수
# 그간 정의된 함수에는 PASSED, FAILED 상태(compliance)를 나타내는 함수가 없었기에 새롭게 정의.
# 필요하다면 기존 함수와 통합 가능# NIST 보안 표준 제어 항목 목록 가져오기# NIST 보안 표준 제어 항목 목록 가져오기
'''
def get_nist_controls_list_with_compliance():
    # NIST 표준 구독 ARN 가져오기
    standards_subscription_arn = get_standards_subscription_arn()
    if not standards_subscription_arn:
        raise ValueError("NIST 표준이 활성화되어 있지 않거나 ARN을 찾을 수 없습니다.")
    
    # AWS Security Hub 클라이언트 생성
    client = get_securityhub_client()
    
    # NIST 표준의 모든 제어 항목 가져오기
    controls = client.describe_standards_controls(
        StandardsSubscriptionArn=standards_subscription_arn
    ).get('Controls', [])
    
    # 각 제어 항목의 ComplianceStatus 확인
    for control in controls:
        control_id = control.get('ControlId')
        
        # 특정 제어 항목에 대한 Findings 가져오기
        findings = client.get_findings(
            Filters={
                'ComplianceSecurityControlId': [{'Value': control_id, 'Comparison': 'EQUALS'}],
                'ComplianceStatus': [{'Value': 'FAILED', 'Comparison': 'EQUALS'}]  # FAILED 상태만 필터링
            }
        ).get('Findings', [])
        
        # Findings가 없으면 PASSED, 있으면 FAILED
        control['ComplianceStatus'] = 'PASSED' if not findings else 'FAILED'
    
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
    
    # JSON 형식으로 반환
    #return json.dumps(filtered_controls, indent=4, default=str)
    return filtered_controls

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
        data = {
            
            "disabled_count": disabled_count,
            "enabled_count": enabled_count,
            "passed_count": passed_count
        }
        

        # 결과 반환
        return json.dumps(data, indent=4)
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}
'''

def get_controls_onecontrol():
    # standards_subscription_arn = get_standards_subscription_arn()
    client = get_securityhub_client()
    next_token = None
    findings = []

    # Compliance 상태 확인 및 필터링
    start_time = time.time()  # `for` 루프 시작 시간 기록
    print("Fetching findings for one control started...")

    while True:
        if next_token:  # 다음 페이지가 있는 경우
            findings_response = client.get_findings(
                Filters={
                    "RecordState": [{"Value": "ACTIVE", "Comparison": "EQUALS"}],
                },
                NextToken=next_token,
            )
        else:  # 첫 번째 호출인 경우
            findings_response = client.get_findings(
                Filters={
                    "RecordState": [{"Value": "ACTIVE", "Comparison": "EQUALS"}],
                }
            )

        findings.extend(findings_response.get("Findings", []))
        next_token = findings_response.get("NextToken")  # 다음 페이지 토큰 갱신
        if not next_token:  # 더 이상 페이지가 없으면 종료
            break
    
    print("Findings length",findings.__len__())


    end_time = time.time()  # `for` 루프 종료 시간 기록
    print(
        f"Fetching findings completed. Time taken: {end_time - start_time:.2f} seconds"
    )
       
    
def get_controls_onecontrol2():
        client = get_securityhub_client()
        next_token = None
        findings = []  # 모든 Finding 저장

        # Compliance 상태 확인 및 필터링
        start_time = time.time()  # `for` 루프 시작 시간 기록
        print("Fetching findings for one control started...")

        while True:
            # Security Hub API 호출
            if next_token:
                findings_response = client.get_findings(
                    Filters={
                        "RecordState": [{"Value": "ACTIVE", "Comparison": "EQUALS"}],
                    },
                    NextToken=next_token,
                )
            else:
                findings_response = client.get_findings(
                    Filters={
                        "RecordState": [{"Value": "ACTIVE", "Comparison": "EQUALS"}],
                    }
                )

            findings.extend(findings_response.get("Findings", []))  # Findings 추가
            next_token = findings_response.get("NextToken")  # 다음 페이지 토큰 갱신
            if not next_token:  # 더 이상 페이지가 없으면 종료
                break

        # 총 체크 개수와 실패한 체크 개수 계산
        total_checks = len(findings)
        failed_checks = sum(
            1 for finding in findings
            if finding.get('Compliance', {}).get('Status') == 'FAILED'
        )

        # 결과 출력
        print("Findings length:", total_checks)
        print("Failed checks:", failed_checks)

        end_time = time.time()  # `for` 루프 종료 시간 기록
        print(f"Fetching findings completed. Time taken: {end_time - start_time:.2f} seconds")

        # 반환 데이터 구조 정의
        return {
            "totalChecks": total_checks,
            "failedChecks": failed_checks,
            "complianceStatus": "FAILED" if failed_checks > 0 else "PASSED",
        }

def get_control_status_counts2():
    standards_subscription_arn = get_standards_subscription_arn()
    if not standards_subscription_arn:
        raise ValueError("NIST 표준이 활성화되어 있지 않거나 ARN을 찾을 수 없습니다.")

    client = get_securityhub_client()
    controls = []
    next_token = None

    # 초기 메타데이터 수집 (페이징 처리)
    while True:
        if next_token:
            response = client.describe_standards_controls(
                StandardsSubscriptionArn=standards_subscription_arn,
                NextToken=next_token
            )
        else:
            response = client.describe_standards_controls(
                StandardsSubscriptionArn=standards_subscription_arn
            )
        controls.extend(response.get("Controls", []))
        next_token = response.get("NextToken")
        if not next_token:
            break

    # 모든 Control ID 수집
    control_ids = [control.get("ControlId") for control in controls]

    # Control ID를 20개씩 나누어 처리
    batch_size = 20
    failed_controls = set()

    for i in range(ceil(len(control_ids) / batch_size)):
        batch = control_ids[i * batch_size:(i + 1) * batch_size]
        findings_response = client.get_findings(
            Filters={
                'ComplianceSecurityControlId': [{'Value': cid, 'Comparison': 'EQUALS'} for cid in batch],
                'RecordState': [{'Value': 'ACTIVE', 'Comparison': 'EQUALS'}]
            }
        )
        findings = findings_response.get("Findings", [])
        # 실패한 Control ID 추출
        failed_controls.update(
            finding.get("ComplianceSecurityControlId")
            for finding in findings
            if finding.get("Compliance", {}).get("Status") == "FAILED"
        )

    # 각 Control에 대해 ComplianceStatus 설정
    for control in controls:
        control_id = control.get("ControlId")
        control["ComplianceStatus"] = "FAILED" if control_id in failed_controls else "PASSED"

    # 상태별 개수 계산
    disabled_count = sum(1 for control in controls if control.get("ControlStatus") == "DISABLED")
    enabled_count = sum(1 for control in controls if control.get("ControlStatus") == "ENABLED")
    passed_count = sum(1 for control in controls if control.get("ComplianceStatus") == "PASSED")

    # 반환 데이터 구성
    data = {
        "control_status_counts": {
            "disabled_count": disabled_count,
            "enabled_count": enabled_count,
            "passed_count": passed_count
        }
    }

    return json.dumps(data, indent=4)
