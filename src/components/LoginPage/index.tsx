// src/components/loginpage/index.tsx

import React from 'react';
import LoginPage from './LoginPage'; // Make sure the import path is correct

const SomeOtherComponent: React.FC = () => {
  // You can use LoginPage here
  return (
    <div>
      <h1>Some Other Component</h1>
      <LoginPage onLogin={(username, password) => console.log(username, password)} />
    </div>
  );
};

export default SomeOtherComponent;
