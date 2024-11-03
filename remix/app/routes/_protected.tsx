import { Box, Container } from "@chakra-ui/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import Footer from "~/components/footer";
import Nav from "~/components/nav";
import { Outlet } from "@remix-run/react";
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
        <Container py="4">
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </>
  );
}
