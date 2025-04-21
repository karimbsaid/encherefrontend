import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser, signupUser } from "../service/apiLogin";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser({ email: decodedToken.sub, token });
    }
    setIsLoading(false); // Done checking localStorage
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      const { token } = response;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      setUser({ email: decodedToken.sub, token });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (formData) => {
    setIsLoading(true);
    try {
      const { name, email, password } = formData;
      await signupUser(name, email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("token");
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
