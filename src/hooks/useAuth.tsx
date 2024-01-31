import { useContext } from "react";
import AuthContext, { AuthContextProps } from "../contexts/authContext";

const useAuth = (): AuthContextProps => {
  return useContext(AuthContext) as AuthContextProps;
};

export default useAuth;
