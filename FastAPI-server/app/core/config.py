from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sociofy FastAPI Application"
    MONGODB_URI: str
    GEMINI_API_KEY: str
    SITE_URL: str
    JWT_SECRET: str
    REPLICATE_API_TOKEN: str

    class Config:
        env_file = ".env"

settings = Settings()