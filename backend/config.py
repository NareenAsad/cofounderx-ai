from pydantic import BaseSettings

class Settings(BaseSettings):
    GROQ_API_KEY: str
    SUPABASE_URL: str
    SUPABASE_KEY: str
    HF_TOKEN: str

    class Config:
        env_file = ".env"

settings = Settings()
