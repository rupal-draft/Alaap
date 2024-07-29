from pydantic import BaseModel

class Comment(BaseModel):
    text: str

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str