from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models, schemas
from .database import engine, SessionLocal,get_db
from prometheus_fastapi_instrumentator import Instrumentator
from .routers import routes
from fastapi.middleware.cors import CORSMiddleware
from typing import List


models.Base.metadata.create_all(bind=engine)

app = FastAPI()
Instrumentator().instrument(app).expose(app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router)


@app.post("/orders/", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    db_order = models.Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order
@app.get("/orders/", response_model=List[schemas.Order])
def list_orders(db: Session = Depends(get_db)):
    return db.query(models.Order).all()




