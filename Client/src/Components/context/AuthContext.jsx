import React, { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null)
  const [userId, setUseId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const Role = localStorage.getItem("role")
    const UserId = localStorage.getItem("userId")
    if (UserId) setUseId(UserId)
    if (token) setAccessToken(token);
    if (Role) setRole(Role)
    

  }, []);

  const login = (token, Role, UserId) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("role", Role)
    localStorage.setItem("userId", UserId)
    setAccessToken(token);
    setRole(Role)
    setUseId(UserId)
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role")
    localStorage.removeItem("userId")
    setAccessToken(null);
    setRole(null)
    setUseId(null)
  };

  return (
    <AuthContext.Provider value={{ accessToken, role, userId, login, logout, }}>
      {children}
    </AuthContext.Provider>
  );
};
