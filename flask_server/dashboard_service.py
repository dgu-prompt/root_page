import requests
import os
from dotenv import load_dotenv
from flask import jsonify

# .env 파일 로드
load_dotenv()

# 환경 변수에서 Jira API URL과 토큰 가져오기
JIRA_API_URL = os.getenv("JIRA_API_URL")
API_TOKEN = os.getenv("JIRA_API_TOKEN")
HEADERS = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}

def get_tickets_status():
    jql_query = "project = VT" # JQL 쿼리로 전체 Elastalert 관련 티켓 가져오기
    params = {
        "jql": jql_query,
        "fields": ["summary", "status", "created", "resolutiondate"],
        "maxResults": 100
    }

    try:
        # Jira API 요청
        response = requests.get(JIRA_API_URL, headers=HEADERS, params=params)
        response.raise_for_status()
        issues = response.json().get("issues", [])
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}, 500  # JSON 형식의 오류 메시지 반환

    # 통계 변수 초기화
    total_count = len(issues)  # 전체 티켓 개수
    resolved_count = 0         # 해결된 티켓 개수
    unresolved_count = 0       # 미해결 티켓 개수
    ticket_details = []

    # 티켓 상태별 개수 계산 및 상세 정보 수집
    for issue in issues:
        status = issue["fields"]["status"]["name"]
        is_resolved = status == "Resolved"  # 상태가 "Resolved"일 때 해결된 티켓으로 간주
        resolved_count += is_resolved
        unresolved_count += not is_resolved

        # 티켓 상세 정보 추가
        ticket_details.append({
            "summary": issue["fields"]["summary"],
            "created": issue["fields"]["created"],
            "resolved": issue["fields"]["resolutiondate"] if is_resolved else None,
            "status": status
        })

    # 반환할 통계 데이터 구조화
    return {
        "total_ticket_count": total_count,
        "resolved_ticket_count": resolved_count,
        "unresolved_ticket_count": unresolved_count,
        "ticket_details": ticket_details
    }
