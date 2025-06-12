import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/products/')
      .then((res) => res.json())
      .then((data) => {
        const grouped = data.reduce((acc, item) => {
          if (!acc[item.name]) {
            acc[item.name] = { ...item, count: 1 };
          } else {
            acc[item.name].count += 1;
          }
          return acc;
        }, {});
        setProducts(Object.values(grouped));
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.name} className="p-4 border rounded shadow">
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="text-gray-600">${product.price}</p>
            {product.count > 1 && (
              <p className="text-sm text-blue-500">Quantity: {product.count}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
