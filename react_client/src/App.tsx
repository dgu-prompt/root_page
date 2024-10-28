import { Provider as ChakraProvider } from "@/components/ui/provider";
import { AuthProvider } from "./pages/auth/authContext";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Outlet /> {/* 하위 라우트 레이아웃을 렌더링 */}
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
