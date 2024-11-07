import { Box } from "@chakra-ui/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import Footer from "~/components/layout/Footer";
import Nav from "~/components/layout/Navbar";
import { getSession } from "~/sessions";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    return redirect("/login");
  }
  return null;
}

export default function ProtectedPage() {
  return (
    <>
      <Nav />
      <Box as="main" flex="1">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
