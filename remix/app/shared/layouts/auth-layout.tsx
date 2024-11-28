import { Center } from "@chakra-ui/react";
import { Outlet } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Center bg="bg.muted" flex="1">
      <Outlet />
    </Center>
  );
}
