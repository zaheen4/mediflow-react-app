from flask import request
import jwt
import datetime
import os

SECRET_KEY = os.getenv("SECRET_KEY")

def generate_token(user_id, role):
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_token():
    token = request.headers.get("Authorization")
    if not token or not token.startswith("Bearer "):
        return None

    try:
        decoded_token = jwt.decode(token.split(" ")[1], SECRET_KEY, algorithms=["HS256"])
        return decoded_token
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
