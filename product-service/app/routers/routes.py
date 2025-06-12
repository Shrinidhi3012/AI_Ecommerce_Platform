from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter()


@router.post("/products/", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Product).filter_by(name=product.name).first()
    if existing:
        raise HTTPException(status_code=409, detail="Product already exists")
    
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


@router.get("/products/", response_model=list[schemas.Product])
def list_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()


@router.get("/products/name/{product_name}", response_model=schemas.Product)
def get_product_by_name(product_name: str, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.name == product_name).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.patch("/products/decrement/{product_id}")
def decrement_stock(product_id: int, payload: schemas.QuantityPayload, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.quantity < payload.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")
    product.quantity -= payload.quantity
    db.commit()
    return {"message": "Stock updated", "remaining": product.quantity}
