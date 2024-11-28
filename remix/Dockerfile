# 1. Node.js 베이스 이미지 선택
FROM node:20-alpine

# 2. 컨테이너 내 작업 디렉토리 설정
WORKDIR /app/remix

COPY .env .

# 5. 소스 코드 복사
COPY /app/remix .

# 4. 의존성 설치
RUN npm install

# 6. Remix 빌드 실행
RUN npm run build --verbose

# 7. 컨테이너 포트 설정
EXPOSE 3000

# 8. 시작 명령어
CMD ["npm", "start"]