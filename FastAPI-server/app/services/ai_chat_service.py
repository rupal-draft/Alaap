from app.db.database import chat_collection
import google.generativeai as genai
from app.core.config import settings
from bson import ObjectId

genai.configure(api_key=settings.GEMINI_API_KEY)
genai_model = genai.GenerativeModel('gemini-1.5-flash')

def handle_getall_chat(user_id: str):
    user_object_id = ObjectId(user_id)
    try:
        chat_documents = chat_collection.find({"user_id": user_object_id})
        chat_documents_list = list(chat_documents)  
        for chat in chat_documents_list:
            chat["_id"] = str(chat["_id"])  
            chat["user_id"] = str(chat["user_id"]) 
        return chat_documents_list
    except Exception as e:
        raise ValueError("An unexpected error occurred while finding the chats of the user.") from e

def handle_getone_chat(chat_id: str, user_id: str):
    try:
        chat_object_id = ObjectId(chat_id)
        user_object_id = ObjectId(user_id)
        chat_document = chat_collection.find_one({"_id": chat_object_id, "user_id": user_object_id})
        
        if chat_document:
            chat_document["_id"] = str(chat_document["_id"])
            chat_document["user_id"] = str(chat_document["user_id"])
            return chat_document
        else:
            raise ValueError("Chat document not found.")
    except Exception as e:
        raise ValueError("An unexpected error occurred while finding the chat.") from e

    
def handle_create_chat(user_id: str):
    try:
        chat_doc = {
            "user_id": ObjectId(user_id),
            "messages": []
        }
        result = chat_collection.insert_one(chat_doc)
        return result.inserted_id
    except Exception as e:
        raise ValueError("An unexpected error occurred while creating the chat.") from e

def handle_chat(message: str, chat_id: str):
    try:
        chat_object_id = ObjectId(chat_id)
        chat_document = chat_collection.find_one({"_id": chat_object_id})
        
        if chat_document:
            length_of_messages = len(chat_document['messages'])
            if length_of_messages > 0:
                prev_response = chat_document['messages'][length_of_messages-1]['response']
                prompt = prev_response + "\n The above is the response you provided in the previous message. If in the next message any reference of the previous message is mentioned then you can take reference from this. Also you can give the response in your own way. The next message is: \n" + message
            else:
                prompt = message
                
            response = genai_model.generate_content(prompt)
            
            new_message = {
                "message": message,
                "response": response.text
            }

            result = chat_collection.update_one(
                {"_id": chat_object_id},
                {"$push": {"messages": new_message}}
            )

            return response.text
        
        else:
            raise ValueError("No existing chat.") from e
        
    except Exception as e:
        raise ValueError("An unexpected error occurred while chatting with AI.") from e
    
def handle_delete_chat(chat_id: str):
    try:
        chat_object_id = ObjectId(chat_id)
        result = chat_collection.delete_one({"_id": chat_object_id})
        
        if result.deleted_count == 0:
            raise ValueError("Chat not found or user does not have permission to delete this chat.")
        
    except Exception as e:
        raise ValueError("An unexpected error occurred while deleting the chat.") from e
