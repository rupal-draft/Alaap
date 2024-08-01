from pymongo import MongoClient
from app.core.config import settings

client = MongoClient(settings.MONGODB_URI)
db = client.get_database("test")
chat_collection = db.get_collection("ai-chats")
user_collection = db.get_collection("users")