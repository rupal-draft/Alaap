from fastapi import APIRouter, HTTPException, Depends
from app.models.pydantic_models import UserAllChatsResponse, ChatRequest, ChatResponse, ChatDocumentId, ChatDocument
from app.services.ai_chat_service import handle_getall_chat, handle_getone_chat, handle_create_chat, handle_chat, handle_delete_chat
from app.middlewares.auth_middleware import get_current_user

router = APIRouter()

@router.get("/ai-chat", response_model=UserAllChatsResponse)
async def getall_chats(user: dict = Depends(get_current_user)):
    try:
        chat_documents = handle_getall_chat(str(user["_id"]))
        return UserAllChatsResponse(chat_documents=chat_documents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/ai-chat/{chat_id}", response_model=ChatDocument)
async def ai_chat(chat_id: str, user: dict = Depends(get_current_user)):
    try:
        chat_document = handle_getone_chat(chat_id, str(user["_id"]))
        return ChatDocument(**chat_document)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai-chat", response_model=ChatDocumentId)
async def create_chat(user: dict = Depends(get_current_user)):
    try:
        chat_id = handle_create_chat(str(user["_id"]))
        return ChatDocumentId(chat_id=str(chat_id))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/ai-chat/{chat_id}", response_model=ChatResponse)
async def ai_chat(chat_id: str, request: ChatRequest, user: dict = Depends(get_current_user)):
    try:
        response = handle_chat(request.message, chat_id)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.delete("/ai-chat/{chat_id}")
async def delete_chat(chat_id: str, user: dict = Depends(get_current_user)):
    try:
        handle_delete_chat(chat_id)
        return {"msg": "Chat deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))