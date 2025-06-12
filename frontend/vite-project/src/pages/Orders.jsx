import { useEffect, useState } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8002/orders/')
      .then((res) => res.json())
      .then((data) => {
        const grouped = data.reduce((acc, item) => {
          const key = item.product_name;
          if (!acc[key]) {
            acc[key] = { ...item, total_quantity: item.quantity };
          } else {
            acc[key].total_quantity += item.quantity;
          }
          return acc;
        }, {});
        setOrders(Object.values(grouped));
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <ul className="space-y-2">
        {orders.map((order, index) => (
          <li key={index} className="p-4 border rounded shadow">
            <p className="text-lg font-semibold">Product: {order.product_name}</p>
            <p className="text-gray-600">Total Quantity: {order.total_quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
