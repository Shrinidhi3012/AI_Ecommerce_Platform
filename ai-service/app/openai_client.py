from openai import OpenAI
import os

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
