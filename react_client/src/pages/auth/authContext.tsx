// authContext.tsx
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Context 타입 정의
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

// Context 접근 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
