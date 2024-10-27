dockerfile
코드 복사
# Python 베이스 이미지
FROM python:3.8.3

# 작업 디렉토리 설정
WORKDIR /app

# 요구 사항 파일 복사 및 설치
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Flask 코드 복사
COPY . .

# Flask 앱 실행
CMD ["python", "app.py"]

