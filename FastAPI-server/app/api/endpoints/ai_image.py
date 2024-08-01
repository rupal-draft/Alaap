from fastapi import APIRouter, HTTPException, Depends
from app.models.pydantic_models import ImageRequest, ImageResponse
from app.middlewares.auth_middleware import get_current_user
from app.services.ai_image_service import handle_image_gen

router = APIRouter()


@router.post("/ai-image", response_model=ImageResponse)
async def ai_image(request: ImageRequest, user: dict = Depends(get_current_user)):
    try:
        response = handle_image_gen(request.text, request.num_images)
        return ImageResponse(image_urls=response)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
