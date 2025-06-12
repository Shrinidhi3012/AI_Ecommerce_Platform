import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchProducts = () => {
    fetch('http://localhost:8001/products/')
      .then((res) => res.json())
      .then(setProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleBuy = async (name) => {
    setError("");
    try {
      const res = await fetch("http://localhost:8002/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_name: name, quantity: 1 }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Failed to place order");
      } else {
        fetchProducts(); // Refresh stock after successful order
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="p-4 border rounded shadow">
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-blue-500">In stock: {product.quantity}</p>
            <button
              onClick={() => handleBuy(product.name)}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
              disabled={product.quantity <= 0}
            >
              {product.quantity > 0 ? "Buy" : "Out of stock"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
