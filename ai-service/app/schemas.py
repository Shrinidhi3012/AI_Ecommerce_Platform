from pydantic import BaseModel
from typing import List

class ProductList(BaseModel):
    products: List[str]
