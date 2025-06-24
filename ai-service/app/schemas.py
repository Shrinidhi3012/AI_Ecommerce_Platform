from pydantic import BaseModel
from typing import List

class ProductList(BaseModel):
    products: List[str]
class InterestRequest(BaseModel):
    interest: str
