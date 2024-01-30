// src/components/LoginPage.tsx

import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string, isAdmin: boolean) => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    // Perform authentication logic (e.g., API call) here
    // For simplicity, assume authentication is successful

    // Simulate API call
    const fakeApiCall = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    fakeApiCall.then(() => {
      // On successful authentication, invoke the onLogin callback
      onLogin(username, isAdmin);
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Login as Admin:
        <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
