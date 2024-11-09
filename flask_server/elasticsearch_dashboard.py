from elasticsearch import Elasticsearch
import pandas as pd
import matplotlib.pyplot as plt
import os
import json



# 환경 변수에서 Elasticsearch 연결 정보 가져오기
# elasticsearch_url = os.getenv('ELASTICSEARCH_URL')
# password = os.getenv('ELASTICSEARCH_PASSWORD')
ca_certs = os.getenv('ELASTICSEARCH_CA_CERTS')

# Elasticsearch 연결 설정
es = Elasticsearch(
    "https://3.36.50.130:9200",  # URL을 리스트로 감싸기
    basic_auth=("elastic", "changeme"),  # http_auth 대신 basic_auth 사용
    ca_certs=ca_certs,
    verify_certs=False,  # 인증서 확인 비활성화
    request_timeout=30
)


# EC2.19에 대한 보안 이슈만 가져오는 함수
def get_all_security_issues(index=".ds-logs-aws.securityhub_findings-default-*"):
    query = {
        "size": 100,  # 가져올 문서 수
        "_source": ["aws.securityhub_findings"],  # 가져올 필드 지정
        "query": {
            "term": {
                "aws.securityhub_findings.generator.id": "security-control/EC2.19"  # EC2.19에 해당하는 문서만 필터링
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

# EC2.19에 해당하는 보안 이슈 데이터를 JSON 형식으로 가져오기
json_result = get_all_security_issues()

# 결과 출력 (json 형식으로 출력)
# print(json_result)

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

# 모든 보안 이슈 데이터를 JSON 형식으로 가져오기
json_result = get_all_security_issues()

# 결과 출력 (json 형식으로 출력)
# print(json_result)

# 비활성화, 활성화, 통과 갯수는 securityhub에서 가져오기




# 보안 이슈 데이터에서 필요한 정보만 추출하는 함수 (PASSED 상태 제외)
# 검사가 여러개 된 애들에 대해서는 가장 최근에 검사된 애로 가져와야한다.
# check가 어떤 식으로 구분되어있는지 확인하기
def get_security_issues_filtered(index=".ds-logs-aws.securityhub_findings-default-*"):
    query = {
        "size": 10,  # 가져올 문서 수
        "_source": [
            "aws.securityhub_findings.severity",
            "aws.securityhub_findings.compliance.status",
            "aws.securityhub_findings.id",
            "aws.securityhub_findings.generator.id",
            "aws.securityhub_findings.region",
            "aws.securityhub_findings.last_observed_at",
            "aws.securityhub_findings.workflow.state",
            "aws.securityhub_findings.product.fields.aws/securityhub/FindingId"
        ],  # 필요한 필드만 지정
        "query": {
            "bool": {
                "must": [
                    {"match_all": {}}
                ],
                "filter": [
                    {"term": {"aws.securityhub_findings.compliance.status": "FAILED"}},  # PASSED 상태 제외, FAILED만
                ]
            }
        }
    }
    
    response = es.search(index=index, body=query)
    hits = response['hits']['hits']

    # 필요한 정보만 추출하여 리스트에 담기
    filtered_data = []

    for hit in hits:
        # 정확한 경로로 데이터 추출
        if 'aws' in hit['_source'] and 'securityhub_findings' in hit['_source']['aws']:
            finding = hit['_source']['aws']['securityhub_findings']
            filtered_data.append({
                "region": finding['region'],  
                "last_observed_at": finding['last_observed_at'],
                "severity": finding['severity']['original'],
                "status": finding['compliance']['status'],
                "ControlId": finding['id'],
                "FindingsId": finding.get('product', {}).get('fields', {}).get('aws/securityhub/FindingId', ''),
                            
                "workflow_state": finding['workflow']['state']
            })
        else:
            print(f"Key 'aws.securityhub_findings' not found in hit: {hit}")  # 디버깅용 출력

    # JSON 형식으로 보기 좋게 들여쓰기
    json_data = json.dumps(filtered_data, indent=4)

    return json_data

# 필터링된 보안 이슈 데이터 가져오기
filtered_result = get_security_issues_filtered()

# 결과 출력 (json 형식으로 출력)
print(filtered_result)

# # 데이터 시각화 함수
# def visualize_failed_compliance(data):
#     # 데이터 가공
#     records = [hit['_source']['aws.securityhub_findings'] for hit in data]
#     df = pd.DataFrame(records)

#     # 'FAILED'인 항목만 필터링
#     failed_df = df[df['ComplianceStatus'] == 'FAILED']

#     # severity 분포 시각화
#     plt.figure(figsize=(12, 6))
#     failed_df['Severity'].value_counts().plot(kind='bar', color='orange')
#     plt.title('Distribution of Severity Levels for FAILED Items')
#     plt.xlabel('Severity Level')
#     plt.ylabel('Count')
#     plt.xticks(rotation=45)
#     plt.tight_layout()
#     plt.show()

#     # ResourceType 분포 시각화
#     plt.figure(figsize=(12, 6))
#     failed_df['ResourceType'].value_counts().plot(kind='bar', color='blue')
#     plt.title('Distribution of Resource Types for FAILED Items')
#     plt.xlabel('Resource Type')
#     plt.ylabel('Count')
#     plt.xticks(rotation=45)
#     plt.tight_layout()
#     plt.show()


# # 대시보드 시각화
# def plot_dashboard():
#     fig, ax = plt.subplots(1, 2, figsize=(15, 6))

#     # 1. 발견된 보안 이슈 항목 통계 (IAM, DATA, Network, Security)
#     ax[0].pie(issue_counts, labels=issue_counts.index, autopct='%1.1f%%', startangle=90)
#     ax[0].set_title("Security Issue Counts by Resource Type")

#     # 2. 보안 이슈 항목 심각도 분포
#     severity_counts.plot(kind="bar", ax=ax[1], color=['green', 'yellow', 'orange', 'red', 'darkred'])
#     ax[1].set_title("Security Issue Severity Distribution")
#     ax[1].set_xlabel("Severity")
#     ax[1].set_ylabel("Counts")

#     plt.tight_layout()
#     plt.show()

# # 대시보드 실행
# plot_dashboard()
