// src/components/loginpage/index.tsx

import React from "react";
import LoginPage from "./LoginPage"; // Make sure the import path is correct

export type Account = {
  id: number;
  username: string;
  role: "user" | "admin";
};

const SomeOtherComponent: React.FC = () => {
  // You can use LoginPage here
  return (
    <div>
      <LoginPage
        onLogin={(username, password) => console.log(username, password)}
      />
    </div>
  );
};

export default SomeOtherComponent;
