from fastapi import HTTPException
from app.core.config import settings
import replicate

replicate_client = replicate.Client(api_token=settings.REPLICATE_API_TOKEN)

def handle_image_gen(prompt: str, num_images: int):
    try:
        image_urls = []
        input = {
            "width": 768,
            "height": 768,
            "prompt": prompt,
            "refine": "expert_ensemble_refiner",
            "apply_watermark": False,
            "num_inference_steps": 25
        }
        for _ in range(num_images):
            output = replicate_client.run(
                "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
                input=input
            )
            image_url = output[0] if isinstance(output, list) else output
            image_urls.append(image_url)

        return image_urls
    
    except Exception as e:
        raise ValueError("An unexpected error occurred while generating image with ai.") from e