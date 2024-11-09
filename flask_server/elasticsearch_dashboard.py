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


# 보안 이슈 데이터 구조 확인 함수 (전체 데이터를 JSON 형식으로 반환)
def get_all_security_issues(index=".ds-logs-aws.securityhub_findings-default-*"):
    query = {
        "size": 10,  # 가져올 문서 수
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
print(json_result)

# def analyze_security_issues(data):
#     severity_count = {}
#     resource_type_count = {'Account': 0, 'IAM': 0, 'EC2': 0, 'S3': 0, 'RDS': 0, 'VPC': 0}

#     for hit in data:
#         # 키 존재 여부 체크
#         if 'aws.securityhub_findings' in hit['_source']:
#             finding = hit['_source']['aws.securityhub_findings']
#             severity = finding['severity']['original']  # 위험도
#             resource_type = finding.get('resource', {}).get('Type')  # 자원 유형
            
#             # 위험도 통계
#             if severity not in severity_count:
#                 severity_count[severity] = 0
#             severity_count[severity] += 1
            
#             # 자원 유형 통계
#             if resource_type in resource_type_count:
#                 resource_type_count[resource_type] += 1
#         else:
#             print("Key 'aws.securityhub_findings' not found in hit:", hit)

#     return severity_count, resource_type_count


# # 보안 이슈 데이터 구조 확인 함수
# def get_all_security_issues(index=".ds-logs-aws.securityhub_findings-default-*"):
#     query = {
#         "size": 1,  # 가져올 문서 수
#         "_source": ["aws.securityhub_findings"],  # 가져올 필드 지정
#         "query": {
#             "match_all": {}  # 모든 문서 가져오기
#         }
#     }
#     response = es.search(index=index, body=query)
#     return response['hits']['hits']  # Elasticsearch의 히트 데이터를 반환

# 데이터 가져오기
#data = get_all_security_issues()

# # 있는 데이터를 그대로 출력
# def print_security_issues(data):
#     if data:
#         for hit in data:
#             print(hit['_source'])  # 각 문서의 _source 필드 출력
#     else:
#         print("No security issues found.")
# -----------------
# 보안 이슈 출력
#print_security_issues(data)


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
