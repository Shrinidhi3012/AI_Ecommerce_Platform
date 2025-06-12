import { useEffect, useState } from 'react';

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001/products/')
      .then(res => res.json())
      .then(data => {
        const unique = Array.from(new Set(data.map(p => p.name))).map(name =>
          data.find(p => p.name === name)
        );
        setProducts(unique);
        setSelectedProduct(unique[0]?.name || '');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8002/orders/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_name: selectedProduct, quantity: Number(quantity) })
    });

    if (res.ok) {
      setMessage('Order placed!');
    } else {
      const err = await res.json();
      setMessage(` ${err.detail || 'Failed to place order.'}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Place Order
        </button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}
