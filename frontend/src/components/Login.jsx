import { useState } from 'react';

const API_BASE = 'http://127.0.0.1:5000/api';

function Login({ onLogin, message }) {
  const [username, setUsername] = useState('customer');
  const [password, setPassword] = useState('grocery123');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (result.success) {
      onLogin(result.user);
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <h1>Grocery App Login</h1>
        <p>Use the sample account to browse products and add items to your cart.</p>
        {message && <div className="message">{message}</div>}
        {error && <div className="message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
