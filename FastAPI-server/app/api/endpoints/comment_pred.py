from fastapi import APIRouter, Depends
from app.services.comment_pred_services import make_prediction
from app.models.pydantic_models import CommentRequest
from app.middlewares.auth_middleware import get_current_user

router = APIRouter()

@router.post("/comment")
async def comment_pred(request: CommentRequest, user: dict = Depends(get_current_user)):
    prediction = make_prediction(request.comment)
    return {'toxic': bool(prediction)}