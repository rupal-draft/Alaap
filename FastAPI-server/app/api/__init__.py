from fastapi import APIRouter
from .endpoints import auth, ai_chat, ai_image, comment_pred

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(ai_chat.router, prefix="/chat", tags=["ai_chat"])
router.include_router(ai_image.router, prefix="/image", tags=["ai_image"])
router.include_router(comment_pred.router, prefix="/predict", tags=["comment-predict"])