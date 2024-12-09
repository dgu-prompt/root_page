import { Toaster } from "@/components/ui/toaster";
import { Flex } from "@chakra-ui/react";
import { Outlet, useLoaderData } from "@remix-run/react";

import Footer from "./footer";
import Navbar from "./navbar";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "@/services/sessions";
import { useState, useEffect } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  return Response.json({ userId });
}

export default function AppLayout() {
  const { userId } = useLoaderData<typeof loader>();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <Navbar userId={userId} />
      <Flex as="main" flexGrow="1">
        <Outlet />
      </Flex>
      <Footer />
      <Toaster />
    </>
  );
}
