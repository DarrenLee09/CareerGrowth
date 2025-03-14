from firebase_admin import auth
import firebase_admin
from firebase_admin import credentials
from models.user import User

# Initialize Firebase
cred = credentials.Certificate("F:\\Honque\\backend\\app\\firebase_key.json") # Change this path to where you store the firebase key 
firebase_admin.initialize_app(cred)

class AuthService:
    def register_user(email, password):
        try:
            # Register the user in Firebase Authentication
            user = auth.create_user(
                email=email,
                password=password
            )
            return {"message": "User registered successfully", "email": user.email}
        except Exception as e:
            return {"error": "Registration failed: " + str(e)}

    def login_user(email):
        try:
            # Attempt to retrieve the user from Firebase Authentication
            user = auth.get_user_by_email(email)
            return {"message": "Login successful", "email": user.email}
        except auth.UserNotFoundError:
            return {"error": "User not found"}
        except Exception as e:
            return {"error": "Login failed: " + str(e)}