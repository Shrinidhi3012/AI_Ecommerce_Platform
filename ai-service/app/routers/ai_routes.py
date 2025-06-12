from fastapi import APIRouter, HTTPException
from app.openai_client import summarize_products
from app.schemas import ProductList

router = APIRouter()

@router.post("/summarize-products")
async def summarize_endpoint(data: ProductList):
    try:
        summary = summarize_products(data.products)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
