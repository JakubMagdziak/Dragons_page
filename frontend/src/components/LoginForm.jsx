import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      onLogin(data.token);
    } else {
      alert(data.error || 'Błąd logowania');
    }
  };

  return (
    <form onSubmit={login}>
      <h2>Logowanie administratora</h2>
      <input placeholder="Login" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Hasło" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Zaloguj</button>
    </form>
  );
}

export default LoginForm;
