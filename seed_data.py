import requests

PRODUCT_URL = "http://localhost:8001/products/"
ORDER_URL = "http://localhost:8002/orders/"

products = [
    {"name": "Keyboard", "price": 49, "quantity": 5},
    {"name": "Mouse", "price": 29, "quantity": 10},
    {"name": "Laptop", "price": 899, "quantity": 3},
    {"name": "Webcam", "price": 79, "quantity": 4},
    {"name": "Desk Lamp", "price": 24, "quantity": 8}
]

added_products = []
for product in products:
    try:
        res = requests.post(PRODUCT_URL, json=product)
        if res.status_code == 200:
            print(f"Added: {product['name']}")
            added_products.append(product['name'])
        elif res.status_code == 409:
            print(f"Already exists: {product['name']}")
        else:
            print(f"Failed to add {product['name']} – {res.text}")
    except Exception as e:
        print(f"Error: {e}")

for name in added_products:
    order = {
        "product_name": name,
        "quantity": 2
    }
    try:
        res = requests.post(ORDER_URL, json=order)
        if res.status_code == 200:
            print(f"Order created for: {name}")
        else:
            print(f"Failed to create order for {name} – {res.text}")
    except Exception as e:
        print(f"Error: {e}")
