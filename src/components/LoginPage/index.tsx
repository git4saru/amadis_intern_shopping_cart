// src/components/loginpage/index.tsx

import React from "react";
import UserLoginPage from "../UserLoginPage/UserLoginPage";

export type Account = {
  id: number;
  username: string;
  role: "user" | "admin";
};

function LoginPageComponent() {
  return (
    <div>
      <button>Login as Admin</button>
      <button>Login as User</button>
    </div>
  );
}

export default LoginPageComponent;
