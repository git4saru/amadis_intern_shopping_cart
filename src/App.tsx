import { ReactNode } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { Footer } from "./components/Footer";
import { Products } from "./components/Products";
import { Header } from "./components/Header";
import "./app.module.scss";
import AdminPage from "./components/AdminPage/AdminPage";

import useLocalStorageState from "use-local-storage-state";

import AuthContext, { UserType } from "./contexts/authContext";
import useAuth from "./hooks/useAuth";
import AdminLoginPage from "./components/AdminLoginPage/AdminLoginPage";
import UserLoginPage from "./components/UserLoginPage/UserLoginPage";

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

  const signout = (userData: UserType, cb: () => void) => {
    setTimeout(() => {
      setUser(null);
      if (userData.role === "admin") {
        location.href = "/adminLogin";
      } else {
        location.href = "/userLogin";
      }
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
            <Route path="/adminLogin" element={<AdminLoginPage userType={"admin"} />} />
            <Route path="/userLogin" element={<UserLoginPage userType={"user"}/>} />
          </Routes>
        </main>
      </ProvideAuth>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
