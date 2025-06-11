from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal, engine, Base,get_db
from prometheus_fastapi_instrumentator import Instrumentator
from .routers import routes

Base.metadata.create_all(bind=engine)

app = FastAPI()
Instrumentator().instrument(app).expose(app)

app.include_router(routes.router)


@app.post("/products/", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product
