import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const[role,setRole]=useState(null)

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const Role=localStorage.getItem("role")
    if (token) setAccessToken(token);
    if(Role) setRole(Role)

  }, []);

  const login = (token,Role) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("role",Role)
    setAccessToken(token);
    setRole(Role)
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role")
    setAccessToken(null);
    setRole(null)
  };

  return (
    <AuthContext.Provider value={{ accessToken,role, login, logout, }}>
      {children}
    </AuthContext.Provider>
  );
};
