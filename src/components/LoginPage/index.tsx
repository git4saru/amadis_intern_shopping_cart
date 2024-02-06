// src/components/loginpage/index.tsx

import React from "react";
import UserLoginPage from "../UserLoginPage/UserLoginPage";

export type Account = {
  id: number;
  username: string;
  role: "user" | "admin";
};

const SomeOtherComponent: React.FC = () => {
  // You can use LoginPage here
  return (
    <div>
      {/* <AdminLoginPage userType={"admin"} /> */}
      <UserLoginPage userType={"user"} />
    </div>
  );
};

export default SomeOtherComponent;
