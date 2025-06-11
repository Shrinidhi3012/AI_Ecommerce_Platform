from pydantic import BaseModel

class OrderCreate(BaseModel):
    product_name: str
    quantity: int

class Order(OrderCreate):
    id: int

    model_config = {
        "from_attributes": True
    }
