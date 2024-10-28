import { Provider as ChakraProvider } from "@/components/ui/provider";
import { AuthProvider } from "./contexts/AuthProvider";
import { Outlet } from "react-router-dom";
import "./assets/styles/App.css";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
