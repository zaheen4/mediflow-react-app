from flask import Blueprint, jsonify, request
from utils.auth_utils import generate_token, verify_token
from utils.db_utils import execute_query
import bcrypt

auth_bp = Blueprint('auth', __name__)



# User Registration Route
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    query = "INSERT INTO Users (username, password, role, email) VALUES (%s, %s, %s, %s)"
    execute_query(query, (data['username'], hashed_password.decode('utf-8'), data['role'], data['email']))
    return jsonify({"message": "User registered successfully"}), 201




# User Login Route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    query = "SELECT * FROM Users WHERE username = %s OR email = %s"
    user = execute_query(query, (data['username'], data['username']), fetch_one=True)

    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user['password'].encode('utf-8')):
        token = generate_token(user['user_id'], user['role'])
        response = jsonify({"message": "Login successful", "token": token, "role": user['role'], "username": user['username']})
        print("Response:", response.get_data(as_text=True))  # Debugging
        return response, 200
    else:
        response = jsonify({"error": "Invalid username or password"})
        print("Response:", response.get_data(as_text=True))  # Debugging
        return response, 401