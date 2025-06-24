from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
import requests
import os

router = APIRouter()

PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL", "http://product-service.ecommerce.svc.cluster.local:8000")

@router.post("/orders/", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    try:
        res = requests.get(f"{PRODUCT_SERVICE_URL}/products/name/{order.product_name}")
        res.raise_for_status()
        product = res.json()
        if product.get("quantity", 0) < order.quantity:
            raise HTTPException(status_code=400, detail="Insufficient stock")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Product check failed: {str(e)}")

    try:
        update_res = requests.patch(
            f"{PRODUCT_SERVICE_URL}/products/decrement/{product['id']}",
            json={"quantity": order.quantity}
        )
        update_res.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Stock update failed: {str(e)}")

    db_order = models.Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@router.get("/orders/", response_model=list[schemas.Order])
def list_orders(db: Session = Depends(get_db)):
    return db.query(models.Order).all()
