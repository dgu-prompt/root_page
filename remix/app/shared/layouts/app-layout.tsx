import { Toaster } from "@/components/ui/toaster";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "@remix-run/react";

import Footer from "./footer";
import Navbar from "./navbar";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <Flex as="main" flexGrow="1">
        <Outlet />
      </Flex>
      <Footer />
      <Toaster />
    </>
  );
}
