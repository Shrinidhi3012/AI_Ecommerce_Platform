from fastapi import FastAPI
from app.routers import ai_routes
from dotenv import load_dotenv

load_dotenv()  # Loads .env file into environment variables

app = FastAPI(title="AI Microservice")

app.include_router(ai_routes.router, prefix="/ai")
