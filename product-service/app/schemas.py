from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    price: int

class Product(ProductCreate):
    id: int

    class Config:
        orm_mode = True
