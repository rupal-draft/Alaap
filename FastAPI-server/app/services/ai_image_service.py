from fastapi import HTTPException
from app.core.config import settings
import replicate

replicate_client = replicate.Client(api_token=settings.REPLICATE_API_TOKEN)

def handle_image_gen(prompt: str, num_images: int):
    try:
        image_urls = []
        input={
            "prompt": prompt,
            "num_outputs": num_images,
            "aspect_ratio": "1:1",
            "output_format": "webp",
            "output_quality": 90
        }

            
        image_urls = replicate_client.run(
                "black-forest-labs/flux-schnell",
                input=input
            )

        return image_urls
    
    except Exception as e:
        raise ValueError("An unexpected error occurred while generating image with ai.", e) from e