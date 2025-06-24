from openai import OpenAI
import os
import requests

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize_products(products: list[str]) -> str:
    prompt = (
        "You are an AI assistant trained to describe e-commerce products in detail. "
        "Given a list of product names, provide a short but informative description for each product, "
        "including its general use or purpose.\n\n"
        "Product List: " + ", ".join(products)
    )

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that analyzes and summarizes product descriptions."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=200
    )

    return response.choices[0].message.content

def recommend_products(interest: str) -> str:
    try:
        response = requests.get("http://product-service.ecommerce.svc.cluster.local/products")
        product_list = response.json()
    except:
        raise Exception("Could not fetch product list from product-service")

    product_descriptions = "\n".join(
        [f"- {p['name']}: {p.get('description', '')}" for p in product_list]
    )

    prompt = (
        f"You are a helpful assistant that recommends products based on user interests.\n"
        f"Here is a list of electronics products:\n{product_descriptions}\n\n"
        f"User is interested in: '{interest}'. Recommend 3 suitable products from the list."
    )

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a product recommendation assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=200
    )

    return response.choices[0].message.content
