import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/products/')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="p-4 border rounded shadow">
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="text-gray-600">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
