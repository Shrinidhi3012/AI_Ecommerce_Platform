from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import ai_routes
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Microservice")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_routes.router, prefix="/ai")
