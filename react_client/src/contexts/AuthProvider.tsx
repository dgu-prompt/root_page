import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authToken")
  );
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (username === "testuser" && password === "password123") {
      localStorage.setItem("authToken", "dummyToken123");
      setIsAuthenticated(true);
      navigate("/");
    } else {
      throw new Error("Invalid username or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
