import React from "react";
import LoginPage, { LoginProps }  from "../LoginPage/LoginPage";

const AdminLoginPage: React.FC<LoginProps> = () => {
  // You can customize the behavior for the admin login if needed
  return (
    <LoginPage
      userType="admin"
    />
  );
};

export default AdminLoginPage;