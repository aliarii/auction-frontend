import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserByToken } from "../store/slices/userSlice";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [role, setRole] = useState("user");
  const dispatch = useDispatch();
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      dispatch(getUserByToken(jwt)).then((data) => {
        if (data.error) setRole("");
        else setRole(data.payload.data.user.role);
      });
    }
  }, [dispatch]);

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
