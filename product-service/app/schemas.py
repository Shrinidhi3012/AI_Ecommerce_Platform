from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    price: int
    quantity: int
class QuantityPayload(BaseModel):
    quantity: int    
class Product(ProductCreate):
    id: int

    class Config:
        orm_mode = True
