import { useEffect, useState } from 'react';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const API_BASE = 'http://127.0.0.1:5000/api';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || 'demo_grocery_key';

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState('');

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  });

  useEffect(() => {
    if (user) {
      fetch(`${API_BASE}/products`, { headers: authHeaders() })
        .then(res => res.json())
        .then(setProducts)
        .catch(() => setMessage('Unable to load products.'));
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    setMessage('Welcome back!');
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const checkout = async () => {
    const response = await fetch(`${API_BASE}/cart/checkout`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ cart }),
    });
    const result = await response.json();
    if (result.success) {
      setMessage(`Checkout successful. Total: $${result.total}`);
      setCart([]);
    }
  };

  const fetchRecommendations = async () => {
    const response = await fetch(`${API_BASE}/recommendations`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ cart }),
    });
    const result = await response.json();
    if (result.success) {
      setRecommendations(result.recommendations);
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} message={message} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-row">
          <div className="brand-mark">MG</div>
          <div className="brand-info">
            <p className="brand-name">Manu Gowda Grocery</p>
          </div>
        </div>
        <button onClick={() => setUser(null)} className="logout-button">Logout</button>
      </header>

      <main>
        {message && <div className="message">{message}</div>}
        <div className="layout-grid">
          <section className="panel">
            <h2>Products</h2>
            <ProductList products={products} onAdd={addToCart} />
          </section>
          <section className="panel">
            <h2>Cart</h2>
            <Cart cart={cart} onRemove={removeFromCart} onCheckout={checkout} />
            <button onClick={fetchRecommendations} className="recommend-button">Get Recommendations</button>
            {recommendations.length > 0 && (
              <div className="recommendations">
                <h3>Recommended for you</h3>
                <ul>
                  {recommendations.map(item => (
                    <li key={item.id}>{item.name} — ${item.price.toFixed(2)}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
