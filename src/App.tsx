import { createContext, useState, useContext, ReactNode } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  redirect,
  useNavigate,
} from "react-router-dom";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { Products } from "./components/Products";
import { Header } from "./components/Header";
import "./app.module.scss";
import AdminPage from "./components/AdminPage";
import LoginPage from "./components/LoginPage";

import useLocalStorageState from "use-local-storage-state";

import AuthContext, { UserType } from "./contexts/authContext";
import useAuth from "./hooks/useAuth";

function useProvideAuth() {
  const [user, setUser] = useLocalStorageState<UserType | null>("user", {});
  const navigate = useNavigate();

  const signin = (userData: UserType, cb: () => void) => {
    setTimeout(() => {
      setUser(userData);
      navigate("/");
      cb();
    }, 1000);
  };

  const signout = (cb: () => void) => {
    setTimeout(() => {
      setUser(null);
      navigate("/login");
      cb();
    }, 1000);
  };

  console.log("user details===>", user);

  return {
    user,
    signin,
    signout,
    isAuthenticated: typeof user !== "undefined" && user !== null,
  };
}

export function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated=======================>", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

function App() {
  // const [cart] = useLocalStorageState<CartProps>("cart", {});
  return (
    <BrowserRouter>
      <ProvideAuth>
        <Header />
        <main style={{ marginTop: "10rem" }}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/admin"
                element={
                  <AdminPage
                    onAddProduct={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    onRemoveProduct={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                }
              />
              <Route path="/" element={<Products />} />
              {/* <Route path="/cart" element={<Cart />} /> */}
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </ProvideAuth>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
