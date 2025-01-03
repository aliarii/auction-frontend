import { createContext, useContext, useState } from "react";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
};
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );

  const login = (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
