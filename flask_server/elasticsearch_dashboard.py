from elasticsearch import Elasticsearch
import pandas as pd
import matplotlib.pyplot as plt
import os


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

# 보안 이슈 데이터 가져오기 함수
def get_security_issues(index=".ds-logs-aws.securityhub_findings-default-*"):
    query = {
        "size": 1000,  # 가져올 문서 수
        "_source": ["aws.securityhub_findings.severity.label", "aws.securityhub_findings.resources.Type"],
        "query": {
            "bool": {
                "must": [
                    {"exists": {"field": "aws.securityhub_findings.severity.label"}},
                    {"exists": {"field": "aws.securityhub_findings.resources.Type"}}
                ]
            }
        }
    }
    response = es.search(index=index, body=query)
    records = []
    for hit in response['hits']['hits']:
        severity = hit['_source'].get('aws.securityhub_findings', {}).get('severity', {}).get('label', 'Unknown')
        resource_type = hit['_source'].get('aws.securityhub_findings', {}).get('resources', {}).get('Type', 'Unknown')
        records.append({"severity": severity, "resource_type": resource_type})
    return pd.DataFrame(records)

# 데이터 가져오기
df = get_security_issues()

# IAM, DATA, Network, Security별 이슈 통계 계산
issue_counts = df['resource_type'].value_counts()

# 보안 이슈 항목 심각도 분포 계산
severity_counts = df['severity'].value_counts()

# 대시보드 시각화
def plot_dashboard():
    fig, ax = plt.subplots(1, 2, figsize=(15, 6))

    # 1. 발견된 보안 이슈 항목 통계 (IAM, DATA, Network, Security)
    ax[0].pie(issue_counts, labels=issue_counts.index, autopct='%1.1f%%', startangle=90)
    ax[0].set_title("Security Issue Counts by Resource Type")

    # 2. 보안 이슈 항목 심각도 분포
    severity_counts.plot(kind="bar", ax=ax[1], color=['green', 'yellow', 'orange', 'red', 'darkred'])
    ax[1].set_title("Security Issue Severity Distribution")
    ax[1].set_xlabel("Severity")
    ax[1].set_ylabel("Counts")

    plt.tight_layout()
    plt.show()

# 대시보드 실행
plot_dashboard()
