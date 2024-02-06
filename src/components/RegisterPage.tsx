// src/components/RegisterPage.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useAuth();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Your registration logic here using the signup function
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {/* ... (your registration form) */}
      </form>

      {/* Link back to the login page */}
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default RegisterPage;
