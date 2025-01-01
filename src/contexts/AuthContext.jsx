import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  isAdmin: false,
};
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const [isAdmin, setIsAdmin] = useState(initialState.isAdmin);
  const login = (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", userData.token);
    setIsAdmin(userData.user.role === "admin");
    navigate("/");
    console.log("User logged in");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
