import jwt
import bcrypt
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify
from model import User, db
from flask_login import login_user, logout_user, login_required

# JWT 토큰 생성 함수
def create_jwt_token(secret_key, user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(days=7),  # 토큰 만료 시간: 7일
        "iat": datetime.utcnow()  # 토큰 발급 시간
    }
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    return token

# JWT 토큰 검증 함수
def verify_jwt_token(secret_key, token):
    try:
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload  # 토큰 유효 시 payload 반환
    except jwt.ExpiredSignatureError:
        return None  # 토큰 만료
    except jwt.InvalidTokenError:
        return None  # 유효하지 않은 토큰

# JWT 인증 데코레이터
def jwt_required(secret_key):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            auth_header = request.headers.get('Authorization')
            if not auth_header or not auth_header.startswith('Bearer '):
                return jsonify({"status": "FAILED", "error": "Authentication required. Please log in."}), 401

            token = auth_header.split(" ")[1]
            payload = verify_jwt_token(secret_key, token)
            if not payload:
                return jsonify({"status": "FAILED", "error": "Invalid or expired token. Please log in again."}), 401

            request.user_id = payload['user_id']
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# 회원가입 엔드포인트 함수
def register_user(request):
    json_data = request.get_json()
    if not json_data or 'username' not in json_data or 'password' not in json_data:
        return jsonify({"error": "Username and password required"}), 400

    username = json_data['username']
    password = json_data['password']

    if User.query.filter_by(user_id=username).first():
        return jsonify({"error": "User already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = User(user_id=username, password=hashed_password.decode('utf-8'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

# 로그인 엔드포인트 함수
def login_user_func(request, secret_key):
    json_data = request.get_json()
    if not json_data or 'username' not in json_data or 'password' not in json_data:
        return jsonify({"error": "Username and password required"}), 400

    username = json_data['username']
    password = json_data['password']
    user = User.query.filter_by(user_id=username).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"error": "Invalid password"}), 401

    token = create_jwt_token(secret_key, user.user_id)
    return jsonify({"message": "Login successful!", "username": user.user_id, "token": token}), 200

# 로그아웃 함수
def logout_user_func():
    logout_user()
    return jsonify({"message": "Logged out successfully!"}), 200
