import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "./Navbar";

function Root() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Root;