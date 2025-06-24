from fastapi import APIRouter, HTTPException
from app.schemas import ProductList, InterestRequest
from app.openai_client import summarize_products, recommend_products

router = APIRouter()

@router.post("/summarize-products")
def summarize_products_route(data: ProductList):
    try:
        summary = summarize_products(data.products)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommend-products")
def recommend_products_route(data: InterestRequest):
    try:
        recommendations = recommend_products(data.interest)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))