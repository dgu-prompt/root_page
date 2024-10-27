import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  // AuthContext.js에서 logout이 콜백을 받도록 수정
  const logout = (callback) => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    if (callback) callback(); // 콜백이 있으면 실행 (여기서 navigate 호출 가능)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
