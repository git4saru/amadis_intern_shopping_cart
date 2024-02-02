// src/components/LoginPage.tsx

import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export interface LoginProps {
  userType: "admin" | "user";
}

//hard coded data for testing admin and login page

function AuthenticateUserService(username: string, password: string, userType: "admin" | "user"): any {
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
  console.log(username+'  role='+userType);
  const filteredUsers = dbUserDatas.filter(user => user.role === userType);
  console.log('filtered users====>'+filteredUsers);
  for (let user of filteredUsers) {
    if (user.email === username && user.password === password) {
      return user;
    }
  }

  return null;
}
//To check login credentials
const LoginPage: React.FC<LoginProps> = ({ userType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = AuthenticateUserService(username, password, userType);
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

      
      <p>
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default LoginPage;
