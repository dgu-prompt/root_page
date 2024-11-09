import requests
import os
import re
from dotenv import load_dotenv
from flask import jsonify

# .env 파일 로드
load_dotenv()

# 환경 변수에서 Jira API URL과 토큰 가져오기
JIRA_API_URL = os.getenv("JIRA_API_URL")
JIRA_API_URL_2 = os.getenv("JIRA_API_URL_2")
API_TOKEN = os.getenv("JIRA_API_TOKEN")
HEADERS = {
    "Authorization": os.getenv("JIRA_AUTH_HEADER"),
    "Content-Type": "application/json"
}
    
# severity 값을 추출하는 함수
def extract_severity_from_title(title):
    # 정규 표현식으로 severity: 뒤의 값을 추출
    match = re.search(r"severity:\s*([A-Za-z]+)", title, re.IGNORECASE)
    if match:
        return match.group(1).capitalize()  # 추출된 severity 값 (대소문자 구분 없도록 처리)
    return "Unknown"  # severity가 없으면 "Unknown"으로 처리

# 모든 티켓을 가져오는 함수
def get_tickets_stats():
    jql_query = "project = VT"  # JQL 쿼리로 모든 티켓 가져오기
    params = {
        "jql": jql_query,
        "fields": ["summary", "status", "assignee", "created", "resolutiondate"],
        "maxResults": 100,  # 한 페이지당 최대 100개
        "startAt": 0  # 시작 인덱스
    }

    all_issues = []  # 모든 티켓을 저장할 리스트

    while True:
        try:
            # Jira API 요청
            response = requests.get(JIRA_API_URL, headers=HEADERS, params=params)
            response.raise_for_status()
            issues = response.json().get("issues", [])

            if not issues:
                break  # 더 이상 티켓이 없으면 종료

            all_issues.extend(issues)  # 티켓을 리스트에 추가

            # 다음 페이지로 이동
            params["startAt"] += len(issues)

        except requests.exceptions.RequestException as e:
            # 예외 처리
            return {"error": str(e)}, 500

    # 통계 계산
    total_count = len(all_issues)
    
    # 상태별 통계
    status_distribution = {}
    severity_distribution = {}
    assignee_count = {}

    # 상태별, 심각도별 문제 해결 비율과 담당자별 처리율을 저장할 딕셔너리
    status_severity_resolution = {}
    assignee_resolution_rate = {}

    for issue in all_issues:
        # 상태별 통계
        status_name = issue["fields"]["status"]["name"]
        status_distribution[status_name] = status_distribution.get(status_name, 0) + 1

        # 티켓 제목에서 severity 추출
        title = issue["fields"]["summary"]
        severity = extract_severity_from_title(title)
        severity_distribution[severity] = severity_distribution.get(severity, 0) + 1

        # 담당자별 통계
        assignee = issue["fields"].get("assignee")
        assignee_name = assignee["displayName"] if assignee else "Unassigned"
        assignee_count[assignee_name] = assignee_count.get(assignee_name, 0) + 1

        # 상태별, 심각도별 문제 해결 비율 계산
        if status_name not in status_severity_resolution:
            status_severity_resolution[status_name] = {}

        resolved = issue["fields"]["resolutiondate"] is not None
        if severity not in status_severity_resolution[status_name]:
            status_severity_resolution[status_name][severity] = {"total": 0, "resolved": 0}

        status_severity_resolution[status_name][severity]["total"] += 1
        if resolved:
            status_severity_resolution[status_name][severity]["resolved"] += 1

        # 담당자별 처리율 계산
        if assignee_name not in assignee_resolution_rate:
            assignee_resolution_rate[assignee_name] = {"total": 0, "resolved": 0}

        assignee_resolution_rate[assignee_name]["total"] += 1
        if resolved:
            assignee_resolution_rate[assignee_name]["resolved"] += 1

    # 문제 해결 비율 계산
    for status_name in status_severity_resolution:
        for severity in status_severity_resolution[status_name]:
            resolution_data = status_severity_resolution[status_name][severity]
            resolution_data["resolved_rate"] = resolution_data["resolved"] / resolution_data["total"] if resolution_data["total"] > 0 else 0

    # 처리율 계산
    for assignee_name in assignee_resolution_rate:
        resolution_data = assignee_resolution_rate[assignee_name]
        resolution_data["resolved_rate"] = resolution_data["resolved"] / resolution_data["total"] if resolution_data["total"] > 0 else 0

    # 결과 반환
    return {
        "total_ticket_count": total_count,
        "status_distribution": status_distribution,
        "severity_distribution": severity_distribution,
        "assignee_count": assignee_count,
        "status_severity_resolution": status_severity_resolution,
        "assignee_resolution_rate": assignee_resolution_rate
    }

# 특정 티켓 세부 내용 추적 함수
def get_ticket_details(ticket_id):
    try:
        response = requests.get(f"{JIRA_API_URL_2}{ticket_id}", headers=HEADERS)
        response.raise_for_status()
        ticket_data = response.json()

        ticket_details = {
            "id": ticket_data["id"],
            "key": ticket_data["key"],
            "summary": ticket_data["fields"]["summary"],
            "status": ticket_data["fields"]["status"]["name"],
            "created": ticket_data["fields"]["created"],
            "updated": ticket_data["fields"]["updated"],
            "description": ticket_data["fields"]["description"]
        }
        return ticket_details
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}