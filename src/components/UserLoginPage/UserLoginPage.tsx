// src/components/UserLoginPage.tsx

import React from "react";
import LoginPage, { LoginProps }  from "../LoginPage/LoginPage";

const UserLoginPage: React.FC<LoginProps> = () => {
  // You can customize the behavior for the user login if needed
  return (
    <LoginPage
      userType="user"
    />
  );
};

export default UserLoginPage;
