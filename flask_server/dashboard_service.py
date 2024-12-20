import requests
import os
import re
import pandas as pd
from dotenv import load_dotenv
from flask import jsonify

# .env 파일 로드
load_dotenv()

# 환경 변수에서 Jira API URL과 토큰 가져오기
JIRA_API_URL = os.getenv("JIRA_API_URL")
JIRA_API_URL_2 = os.getenv("JIRA_API_URL_2")
API_TOKEN = os.getenv("JIRA_API_TOKEN")

# CSV 파일 경로
CSV_PATH = "data/assignee2.csv"

HEADERS = {
    "Authorization": os.getenv("JIRA_AUTH_HEADER"),
    "Content-Type": "application/json"
}

# CSV 파일에서 사용자 데이터를 로드
def load_jira_users():
    try:
        df = pd.read_csv(CSV_PATH, encoding="euc-kr")
        return df
    except Exception as e:
        raise RuntimeError(f"Error loading CSV file: {str(e)}")

# 특정 이메일로 Jira 사용자 정보 반환 로직
def get_jira_user_logic(email: str):
    
    df = load_jira_users()

    # 입력된 이메일로 사용자 검색
    user_data = df[df["assigneeEmail"] == email]

    if user_data.empty:
        raise ValueError("User not found")

    # 사용자 정보 반환
    user = user_data.iloc[0]
    return {
        "email": user["assigneeEmail"],
        "name": user["assigneeName"],
        "avatar": user["avatarUrl"]
    }

# 모든 Jira 사용자 정보 반환 로직
def get_all_jira_users_logic():
    
    df = load_jira_users()

    # 사용자 목록을 배열로 변환
    users = df[["assigneeEmail", "assigneeName", "avatarUrl"]].to_dict(orient="records")
    return users

# data/assignee2.csv 파일을 읽어서 이름과 이메일 매핑
def load_assignee_email_mapping(csv_path="data/assignee2.csv"):
    df = pd.read_csv(csv_path, encoding="euc-kr")
    assignee_email_mapping = dict(zip(df["assigneeName"], df["assigneeEmail"]))
    return assignee_email_mapping

# 모든 티켓을 가져오는 함수
def get_tickets_stats():
    # assignee 이름과 이메일 매핑 로드
    assignee_email_mapping = load_assignee_email_mapping()

    jql_query = "project = VT"  # JQL 쿼리로 모든 티켓 가져오기
    params = {
        "jql": jql_query,
        "fields": ["summary", "status", "assignee", "created", "resolutiondate", "priority"],
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
    priority_distribution = {}
    assignee_count = {}

    # 상태별, priority별 문제 해결 비율과 담당자별 처리율을 저장할 딕셔너리
    status_priority_resolution = {}
    assignee_resolution_rate = {}

    for issue in all_issues:
        # 상태별 통계
        status_name = issue["fields"]["status"]["name"]
        status_distribution[status_name] = status_distribution.get(status_name, 0) + 1

        # priority별 통계
        priority = issue["fields"].get("priority", {}).get("name", "Unknown")
        priority_distribution[priority] = priority_distribution.get(priority, 0) + 1

        # 담당자별 통계
        assignee = issue["fields"].get("assignee")
        assignee_name = assignee["displayName"] if assignee else "Unassigned"
        assignee_email = assignee_email_mapping.get(assignee_name, "No Email")  # 이메일 매칭
        assignee_count[assignee_name] = assignee_count.get(assignee_name, 0) + 1

        # 상태별, priority별 문제 해결 비율 계산
        if status_name not in status_priority_resolution:
            status_priority_resolution[status_name] = {}

        resolved = issue["fields"]["resolutiondate"] is not None
        if priority not in status_priority_resolution[status_name]:
            status_priority_resolution[status_name][priority] = {"total": 0, "resolved": 0}

        status_priority_resolution[status_name][priority]["total"] += 1
        if resolved:
            status_priority_resolution[status_name][priority]["resolved"] += 1

        # 담당자별 처리율 계산
        if assignee_name not in assignee_resolution_rate:
            assignee_resolution_rate[assignee_name] = {"total": 0, "resolved": 0}

        assignee_resolution_rate[assignee_name]["total"] += 1
        if resolved:
            assignee_resolution_rate[assignee_name]["resolved"] += 1

    # 문제 해결 비율 계산
    for status_name in status_priority_resolution:
        for priority in status_priority_resolution[status_name]:
            resolution_data = status_priority_resolution[status_name][priority]
            resolution_data["resolved_rate"] = resolution_data["resolved"] / resolution_data["total"] if resolution_data["total"] > 0 else 0

    # 처리율 계산
    for assignee_name in assignee_resolution_rate:
        resolution_data = assignee_resolution_rate[assignee_name]
        resolution_data["resolved_rate"] = resolution_data["resolved"] / resolution_data["total"] if resolution_data["total"] > 0 else 0

    # 결과 반환
    return {
        "total_ticket_count": total_count,
        "status_distribution": status_distribution,
        "priority_distribution": priority_distribution,  # priority를 기준으로 수정
        "assignee_count": assignee_count,
        "status_priority_resolution": status_priority_resolution,  # priority를 기준으로 수정
        "assignee_resolution_rate": assignee_resolution_rate,
        "assignee_emails": assignee_email_mapping  # 이메일 정보 포함
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