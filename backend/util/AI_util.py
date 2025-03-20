from google import genai
from google.genai import types
from tenacity import retry, wait_random_exponential, stop_after_attempt


import os
import uuid

class Chatbot:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.chat = None # conversation object
    
    @retry(wait=wait_random_exponential(multiplier=1, max=40), stop=stop_after_attempt(3))
    def process_chat(self, prompt):
        if not self.chat:
            self.chat = self.client.chats.create(
            model="gemini-2.0-flash",
            history=[]
        )
        self.chat._comprehensive_history.append(prompt)
        response = self.chat.send_message(
            config=types.GenerateContentConfig(
            system_instruction="You are an assistant whose job is to help users improve their resumes."),
            message=[prompt]
        )
        self.chat._comprehensive_history.append(response)
        return response

'''from openai import OpenAI
import redis
from tenacity import retry, wait_random_exponential, stop_after_attempt

import time
import os
import json
import uuid
import sys

# TO DO: implement retrieval and context creation
class Chatbot:
    def __init__(self):
        self.session_manager = SessionManager()
        self.client = OpenAI(api_key=os.getenv("GEMINI_API_KEY"), 
                base_url="https://generativelanguage.googleapis.com/v1beta/openai/")

    @retry(wait=wait_random_exponential(multiplier=1, max=40), stop=stop_after_attempt(3))
    def process_message(self, prompt, session_id):
        hist = self.session_manager.get_session(session_id)
        if not hist:
            self.session_manager.create_session(session_id)
        
        self.session_manager.add_message(session_id, "user", prompt)

        try:
            response = self.client.chat.completions.create(
                model="gemini-2.0-flash",
                messages=[
                    {"role": "system", 
                    "content": "You are an assistant whose job is to help users improve their resumes."
                    },
                    {"role": "user",
                    "content": prompt
                    },
                ],
            )
            self.session_manager.add_message(session_id, "assistant", str(response))
            return response
        
        except Exception as e:
            print("Unable to generate response")
            print(f"Exception: {e}")
            return e
    
    async def retrive(self):
        pass

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

# TESTING FUNCTIONS

def run_test():
    """Run a simple test of the Redis session manager and chatbot"""
    print("Starting Redis Chatbot Test...")
    
    # Test configuration
    redis_url = "redis://localhost:6379/0"
    test_session_id = f"test-session-{int(time.time())}"
    
    # Connect to Redis
    try:
        redis_client = redis.from_url(redis_url)
        redis_client.ping()
        print("✅ Connected to Redis successfully")
    except redis.exceptions.ConnectionError:
        print("❌ Failed to connect to Redis. Make sure Redis is running.")
        return False
    
    # Initialize session manager
    session_manager = SessionManager(redis_url=redis_url)
    print(f"✅ Initialized session manager with test session: {test_session_id}")
    
    # Test creating a session
    session_manager.create_session(test_session_id)
    print("✅ Created test session")
    
    # Test adding messages
    session_manager.add_message(test_session_id, "user", "Hello!")
    print("✅ Added user message")
    
    # Test retrieving session
    history = session_manager.get_session(test_session_id)
    if history and len(history) == 1:
        print(f"✅ Retrieved session history: {json.dumps(history)}")
    else:
        print(f"❌ Failed to retrieve correct session history: {history}")
        return False
    
    # Initialize chatbot
    chatbot = Chatbot()
    print("✅ Initialized chatbot")
    
    # Test processing a message
    response = chatbot.process_message(test_session_id, "Test message")
    print(f"✅ Processed message and got response: '{response}'")
    
    # Verify conversation history
    history = session_manager.get_session(test_session_id)
    if len(history) == 3:  # Original "Hello" + user message + bot response
        print(f"✅ Conversation history updated correctly with {len(history)} messages")
        print(f"  History: {json.dumps(history, indent=2)}")
    else:
        print(f"❌ Conversation history incorrect: {history}")
        return False
    
    # Test deleting a session
    session_manager.delete_session(test_session_id)
    if not session_manager.get_session(test_session_id):
        print("✅ Successfully deleted test session")
    else:
        print("❌ Failed to delete test session")
        return False
    
    print("\n✅ All tests passed successfully!")
    return True

if __name__ == "__main__":
    success = run_test()
    sys.exit(0 if success else 1)'''

