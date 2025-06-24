import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Orders from './pages/Orders'
import Checkout from './pages/Checkout'
import AISummary from './components/AISummary'
import AIRecommenderPage from './pages/AIRecommenderpage';

function App() {
  return (
    <div className="p-4">
      <nav className="flex gap-4 mb-6 text-blue-600">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/ai-summary">AI Summary</Link> 
        <Link to="/ai-recommender">AI Recommender</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ai-summary" element={<AISummary />} />
        <Route path="/ai-recommender" element={<AIRecommenderPage />} />
      </Routes>
    </div>
  );
}

export default App
