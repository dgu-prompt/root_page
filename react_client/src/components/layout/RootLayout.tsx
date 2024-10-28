import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Root() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <>
      <Navbar />
      <Box as="main" flex="1" py="4">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default Root;
