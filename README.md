# [2024 종합설계] - CSPM 관리자 페이지

## Flask Server 가상 환경 설정 및 실행 가이드

### 1. 가상 환경 생성

가상 환경을 처음 설정할 경우, 다음 명령어를 사용해 `/flask_server/.venv`에 가상 환경을 생성하세요:

```bash
cd flask_server
python3 -m venv .venv
```

### 2. 가상 환경 활성화

생성한 가상 환경을 활성화하려면, OS에 따라 다음 명령어를 실행하세요.

#### MacOS/Linux

```bash
source .venv/bin/activate
```

#### Windows

```bash
.venv\Scripts\activate
```

### 3. 필수 패키지 설치

가상 환경이 활성화된 상태에서 requirements.txt에 정의된 패키지를 설치합니다.

```bash
pip install -r requirements.txt
```

### 4. 서버 실행

패키지 설치가 완료되면 Flask 서버를 실행할 수 있습니다.

```bash
flask run
```

## react_client 실행 방법

### 1. 패키지 설치

다음 명령어를 실행하여 `/react_client`에 필요한 패키지를 설치합니다:

```bash
cd react_client
npm install
```

### 2. 개발 서버 실행

패키지 설치가 완료되면 Vite 개발 서버를 실행하여 애플리케이션을 로컬에서 테스트할 수 있습니다:

```bash
npm run dev
```

실행 후, 브라우저에서 http://localhost:5173으로 접속하여 애플리케이션을 확인할 수 있습니다. (기본 포트는 5173이며, 설정에 따라 다를 수 있습니다.)
