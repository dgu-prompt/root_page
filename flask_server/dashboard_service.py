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
    "Authorization": os.getenv("JIRA_AUTH_HEADER"),
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
        
    except requests.exceptions.HTTPError as e:
        # HTTP 에러의 경우 상태 코드와 메시지를 반환
        return {
            "error": f"{e}: {response.text}",
            "status_code": response.status_code if response else None
        }, response.status_code if response else 500
        
    except requests.exceptions.RequestException as e:
        # 기타 요청 예외 처리
        return {"error": str(e), "status_code": None}, 500
    
    # 통계 변수 초기화
    total_count = len(issues) # 전체 티켓 개수
    resolved_count = sum(1 for issue in issues if issue["fields"]["status"]["name"] == "Resolved") # 해결된 티켓 개수
    unresolved_count = total_count - resolved_count # 미해결 티켓 개수
    ticket_details = [
        {
            "summary": issue["fields"]["summary"],
            "created": issue["fields"]["created"],
            "resolved": issue["fields"]["resolutiondate"] if issue["fields"]["status"]["name"] == "Resolved" else None,
            "status": issue["fields"]["status"]["name"]
        }
        for issue in issues
    ]

    return {
        "total_ticket_count": total_count,
        "resolved_ticket_count": resolved_count,
        "unresolved_ticket_count": unresolved_count,
        "ticket_details": ticket_details
    }
