import os
import yaml
import shutil
import uuid
from flask import request, jsonify
import csv

BASE_PATH = os.path.dirname(__file__)
ASSIGNEE_FILE_PATH = os.path.join(os.path.dirname(__file__), 'data', 'assignee.csv')
# 담당자 정보 읽기
def get_assignee_data():
    assignee_data = []
    with open(ASSIGNEE_FILE_PATH, mode='r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file, delimiter='\t')
        for row in csv_reader:
            assignee_data.append({
                "assigneeId": row['assigneeId'],
                "assigneeName": row['assigneeName']
            })
    return assignee_data

# 규칙 파일 여부 확인
def check_rule_files(alert_type, aws_region, assignee_name, BASE_PATH):
    directory = os.path.join(BASE_PATH, alert_type, aws_region)
    if not os.path.exists(directory):
        return False
    yaml_files = [file for file in os.listdir(directory) if file.endswith('.yaml')]
    rule_file_exists = any(assignee_name in yaml_file for yaml_file in yaml_files)
    return rule_file_exists


def find_yaml_file(base_path, file_name):
    """
    디렉토리를 순회하며 주어진 파일 이름과 일치하는 파일 경로를 반환합니다.
    """
    for root, _, files in os.walk(base_path):
        if file_name in files:
            return os.path.join(root, file_name)
    return None