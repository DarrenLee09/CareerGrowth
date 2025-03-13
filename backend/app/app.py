from flask import Flask, request, jsonify
from models.user import User
from api.api_v1.endpoints.auth import AuthService

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, Flask is working!'

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    user = User(email, password)
    response = AuthService.register_user(email, password)
    return jsonify(response)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    user = User(email, password)
    response = AuthService.login_user(email)
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)