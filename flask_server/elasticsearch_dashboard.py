from elasticsearch import Elasticsearch
import pandas as pd
import matplotlib.pyplot as plt
import os
import json
from flask import redirect, Flask, send_from_directory, request, jsonify, session
from collections import defaultdict, Counter
from datetime import datetime, timedelta
from aws_service import set_securityhub_control_activation, get_controls_list

from dotenv import load_dotenv
load_dotenv()  # .env 파일 로드

# 환경 변수에서 Elasticsearch 연결 정보 가져오기
elasticsearch_url = [os.getenv('ELASTICSEARCH_URL')]
password = os.getenv('ELASTICSEARCH_PASSWORD')
ca_certs = os.getenv('ELASTICSEARCH_CA_CERTS')

# print("elasticsearch_url : ",elasticsearch_url)

# Elasticsearch 연결 설정
es = Elasticsearch(
   elasticsearch_url,  # URL을 리스트로 감싸기
    basic_auth=("elastic", password),  # http_auth 대신 basic_auth 사용
    ca_certs=ca_certs,
    verify_certs=False,  # 인증서 확인 비활성화 // 환경변수설정에 crt파일 경로 붙여넣기
    request_timeout=30
)

# 비활성화, 활성화, 통과 갯수는 securityhub에서 가져오기
# @app.route('/control', methods=['GET'])
# @app.route('/notificationRule', methods=['GET'])
def get_control_item_list():
    try:
        controls = get_controls_list()
        return jsonify(controls)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400  # 사용자에게 오류 메시지 반환
    

# 보안 이슈 데이터 구조 확인 함수 (전체 데이터를 JSON 형식으로 반환)
def get_all_security_issues(index=".ds-logs-aws.securityhub_findings-default-*"):
    query = {
        "size": 100,  # 가져올 문서 수
        "_source": ["aws.securityhub_findings"],  # 가져올 필드 지정
        "query": {
            "match_all": {}  # 모든 문서 가져오기
        }
    }
    # Elasticsearch에서 데이터 검색
    response = es.search(index=index, body=query)
    
    # Elasticsearch의 히트 데이터를 JSON 형식으로 반환
    hits = response['hits']['hits']
    
    # JSON 형식으로 보기 좋게 들여쓰기
    json_data = json.dumps(hits, indent=4)
    
    return json_data  # JSON 형식으로 반환

# test : 특정 controlid에 대한 보안 이슈만 가져오는 함수
def get_all_security_issues(index=".ds-logs-aws.securityhub_findings-default-*"):
    query = {
        "size": 100,  # 가져올 문서 수
        "_source": ["aws.securityhub_findings"],  # 가져올 필드 지정
        "query": {
            "term": {
                "aws.securityhub_findings.generator.id": "security-control/IAM.2"  # EC2.19에 해당하는 문서만 필터링
            }
        }
    }

    # Elasticsearch에서 데이터 검색
    response = es.search(index=index, body=query)
    
    # Elasticsearch의 히트 데이터를 JSON 형식으로 반환
    hits = response['hits']['hits']
    
    # JSON 형식으로 보기 좋게 들여쓰기
    json_data = json.dumps(hits, indent=4)
    
    return json_data  # JSON 형식으로 반환


# 보안 이슈 데이터에서 필요한 정보만 추출하는 함수 (PASSED 상태 제외)
# 검사가 여러개 된 애들에 대해서는 가장 최근에 검사된 애로 가져와야한다.
def get_security_issues_filtered(index=".ds-logs-aws.securityhub_findings-default-*"):
    # 일주일 동안의 감사 로그 분석 - 현재 시간에서 7일 전의 날짜 계산
    seven_days_ago = datetime.now() - timedelta(days=7)
    seven_days_ago_str = seven_days_ago.strftime("%Y-%m-%dT%H:%M:%S.%fZ")

    query = {
        "size": 100,  # 가져올 문서 수
        "_source": [
            "aws.securityhub_findings.severity",
            "aws.securityhub_findings.compliance.status",
            "aws.securityhub_findings.id",
            "aws.securityhub_findings.generator.id",
            "aws.securityhub_findings.region",
            "aws.securityhub_findings.last_observed_at",
            "aws.securityhub_findings.workflow.state",
            "aws.securityhub_findings.product.fields.aws/securityhub/FindingId",
            "aws.securityhub_findings.resources"  # resources도 가져오도록 설정
        ],
        "query": {
            "bool": {
                "must": [
                    {"match_all": {}}
                ],
                "filter": [
                    {"term": {"aws.securityhub_findings.compliance.status": "FAILED"}},  # PASSED 상태 제외, FAILED만
                    {"range": {
                        "aws.securityhub_findings.last_observed_at": {
                            "gte": seven_days_ago_str  # 최근 7일 내의 데이터만
                        }
                    }}
                ]
            }
        }
    }

    response = es.search(index=index, body=query)
    hits = response['hits']['hits']

    # 중복된 검사 log를 id와 resources를 기준으로 그룹화
    grouped_data = defaultdict(list)

    for hit in hits:
        # 정확한 경로로 데이터 추출
        if 'aws' in hit['_source'] and 'securityhub_findings' in hit['_source']['aws']:
            finding = hit['_source']['aws']['securityhub_findings']
            control_id = finding['id']
            resource_id = finding['resources'][0]['Id'] if 'resources' in finding else None

            if resource_id:
                # id와 resource_id를 키로 그룹화
                grouped_data[(control_id, resource_id)].append(finding)
    
    # 각 그룹에서 최신의 'last_observed_at' 값을 가진 항목만 선택 -> aws.securityhub_findings.updated_at 와도 다른지 확인 필요
    filtered_data = []
    for key, findings in grouped_data.items():
        # 최신 날짜 기준으로 정렬
        latest_finding = max(findings, key=lambda x: x['last_observed_at'])
        filtered_data.append({
            "region": latest_finding['region'],
            "last_observed_at": latest_finding['last_observed_at'],
            "severity": latest_finding['severity']['original'],
            "status": latest_finding['compliance']['status'],
            "ControlId": latest_finding['id'],
            "FindingsId": latest_finding.get('product', {}).get('fields', {}).get('aws/securityhub/FindingId', ''),
            "workflow_state": latest_finding['workflow']['state']
        })

    # JSON 형식으로 보기 좋게 들여쓰기
    json_data = json.dumps(filtered_data, indent=4)

    return json_data


# 필터링된 보안 이슈 데이터 가져오기
filtered_result = get_security_issues_filtered()

# 결과 출력 (json 형식으로 출력)
#print(filtered_result)
# 함수 정의: 데이터를 가져온 후 Severity와 ControlId 종류별 분포 계산
def analyze_security_issues(filtered_data):
    # Severity별 분포 계산
    severity_counter = Counter([issue['severity'] for issue in filtered_data])
    
    # Control 종류별 분포 계산 (ControlId에서 "EC2", "IAM" 등만 추출)
    control_counter = Counter([issue['ControlId'].split('/')[1].split('.')[0] for issue in filtered_data])

    # 지정된 순서대로 Severity 결과 정렬
    severity_order = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFORMATIONAL"]
    ordered_severity = {severity: severity_counter.get(severity, 0) for severity in severity_order}
    
    # 결과를 JSON 형식으로 변환
    result = {
        "severity_distribution": ordered_severity,
        "control_type_distribution": dict(control_counter.most_common(5))  # 상위 5개의 Control 종류
    }

    # JSON 형식으로 보기 좋게 들여쓰기
    json_data = json.dumps(result, indent=4)

    return json_data

