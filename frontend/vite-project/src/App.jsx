import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Orders from './pages/Orders'
import Checkout from './pages/Checkout'

function App() {
  return (
    <div className="p-4">
      <nav className="flex gap-4 mb-6 text-blue-600">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App
