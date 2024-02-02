import { createContext } from "react";

export interface UserType {
  id: number;
  role: "user" | "admin";
  name: string;
  email: string;
  password: string;
}

export interface AuthContextProps {
  user: UserType | null | undefined;
  isAuthenticated: boolean;
  signin: (user: UserType, cb: () => void) => void;
  signout: (user: UserType, cb: () => void) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;
