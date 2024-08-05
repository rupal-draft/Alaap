from pydantic import BaseModel, Field, EmailStr

class NewUser(BaseModel):
    email: EmailStr
    password: str

class UserInDB(BaseModel):
    email: EmailStr
    hashed_password: str

class CommentRequest(BaseModel):
    comment: str

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class ChatDocumentId(BaseModel):
    chat_id: str

class Chat(BaseModel):
    message: str
    response: str

class ChatDocument(BaseModel):
    id: str = Field(..., alias="_id")
    user_id: str
    messages: list[Chat]

class UserAllChatsResponse(BaseModel):
    chat_documents: list[ChatDocument]
    
class ImageRequest(BaseModel):
    text: str
    num_images: int = Field(default=1, gt=0, le=2, description="Number of images to generate (1-2)")

class ImageResponse(BaseModel):
    image_urls: list[str]