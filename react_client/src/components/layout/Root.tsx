import { Outlet } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "./Navbar";

function Root() {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Root;
