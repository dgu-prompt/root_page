import { Center } from "@chakra-ui/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Center flex="1" bg="bg.muted">
      {children}
    </Center>
  );
}
