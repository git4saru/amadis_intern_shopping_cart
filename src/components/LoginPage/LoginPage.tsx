// src/components/LoginPage.tsx

import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

//hard coded data for testing admin and login page
function AuthenticateUserService(username: string, password: string): any {
  const dbUserDatas = [
    {
      id: 4566,
      role: "user",
      name: "Harshan",
      email: "harshan@gmail.com",
      password: "harshan",
    },
    {
      id: 4569,
      role: "admin",
      name: "Vignesh",
      email: "vignesh@gmail.com",
      password: "vignesh",
    },
  ];
  for (let user of dbUserDatas) {
    if (user.email === username && user.password === password) {
      return user;
    }
  }

  return null;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = AuthenticateUserService(username, password);
    console.log("user details="+user);
    if (user) { //Not null
      signin(user, () => {
        console.log("Login successful");
      });
    } else {
      alert("Login failed. Please check the credentials");
      // handle failed login attempt here
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
