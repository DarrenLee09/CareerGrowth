from google import genai
from google.genai import types
from tenacity import retry, wait_random_exponential, stop_after_attempt

import os
import uuid

# TODO: integrate auth library into the chatbot
class Chatbot:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.user_sessions = {} # conversation object, maps user to their respective chat
    
    def get_chat_session(self, user_id): # will be used when auth is integrated
        if user_id not in self.user_sessions:
            self.user_sessions[user_id] = self.client.chats.create(
                model="gemini-2.0-flash",
                history=[]
            )
        
        return self.user_sessions[user_id]
    
    @retry(wait=wait_random_exponential(multiplier=1, max=40), stop=stop_after_attempt(3))
    def process_chat(self, prompt):
        chat = self.client.chats.create(
            model="gemini-2.0-flash",
                history=[]
        )
        #chat = self.get_chat_session(user_id)
        #chat._comprehensive_history.append(prompt) # add user's message to the log
        response = chat.send_message(
            config=types.GenerateContentConfig(
            system_instruction="You are an assistant whose job is to help users improve their resumes."),
            message=[prompt]
        )
        #chat._comprehensive_history.append(response) # add chatbot's message
        return response.text
    
# TEST STUFF
    
def test_chatbot():
    print("Starting Chatbot test...")
    
    chatbot = Chatbot()

    test_user_id = str(uuid.uuid4())
    print(f"Test user ID: {test_user_id}")
    
    test_prompt = "Can you help me improve this resume summary: 'Experienced software engineer with 5 years of experience in Python development'?"
    print(f"Test prompt: {test_prompt}")
    
    try:
        response = chatbot.process_chat(test_prompt, test_user_id)

        print("\nResponse from Gemini:")
        print(response.text)

        chat = chatbot.get_chat_session(test_user_id)
        print("\nChat history:")
        for message in chat._curated_history:
            role = "User" if message.role == "user" else "Assistant"
            print(f"{role}: {message.parts[0].text}")
        
        print("\nTest completed successfully!")
        
    except Exception as e:
        print(f"\nError during test: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_chatbot()

'''
import redis

class SessionManager:
    def __init__(self, redis_url="redis://localhost:6379/0", session_expiry=7200):
        self.redis = redis.from_url(redis_url)
        self.session_expiry = session_expiry
        
    def create_session(self, session_id=None):
        if not session_id:
            session_id = str(uuid.uuid4())
            
        self.redis.set( # Start conversation history
            f"session:{session_id}:data",
            json.dumps([]),
            ex=self.session_expiry
        )
        
        return session_id
    
    def get_session(self, session_id):
        data = self.redis.get(f"session:{session_id}:data")
        if not data:
            return None
            
        self._update_session_activity(session_id)
        
        return json.loads(data)
    
    def add_message(self, session_id, role, content):
        if not self.redis.exists(f"session:{session_id}:data"):
            self.create_session(session_id)

        history = json.loads(self.redis.get(f"session:{session_id}:data"))

        history.append({"role": role, "content": content})

        self.redis.set(
            f"session:{session_id}:data",
            json.dumps(history),
            ex=self.session_expiry
        )

        self._update_session_activity(session_id)
    
    def _update_session_activity(self, session_id):
        meta_data = self.redis.get(f"session:{session_id}:meta")
        if meta_data:
            meta = json.loads(meta_data)
            meta["last_activity"] = time.time()
            self.redis.set(
                f"session:{session_id}:meta",
                json.dumps(meta),
                ex=self.session_expiry
            )
        
        self.redis.expire(f"session:{session_id}:data", self.session_expiry)

    def delete_session(self, session_id):
        """Delete a session and all its data"""
        self.redis.delete(f"session:{session_id}:data")
        self.redis.delete(f"session:{session_id}:meta")

'''

