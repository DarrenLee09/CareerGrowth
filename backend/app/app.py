from flask import Flask, request, jsonify
from models.user import User
from api.api_v1.endpoints.auth import AuthService
from flask_cors import CORS
from api.api_v1.endpoints.AI_util import Chatbot

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}) #replace this with our frontend domain in prod

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

@app.route('/chat', methods=['POST'])
def send_message():
    data = request.get_json()
    content = data.get('content')
    
    if not content:
        return jsonify({"error": "Please enter a message"}), 400
    
    chat = Chatbot()
    response = chat.process_chat(content)
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)