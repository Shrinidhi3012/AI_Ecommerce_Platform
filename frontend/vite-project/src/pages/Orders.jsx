import { useEffect, useState } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8002/orders/')
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="p-4 border rounded shadow">
            <p className="text-lg font-semibold">Product: {order.product_name}</p>
            <p className="text-gray-600">Quantity: {order.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}