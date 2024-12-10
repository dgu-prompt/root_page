import Link from "next/link";
import { Container, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import ColorModeToggle from "./color-mode-toggle";
import GithubIcon from "./github-icon";

export default function Footer() {
  return (
    <Container as="footer" py="8" maxWidth="breakpoint-xl">
      <Flex
        align="center"
        direction={{ base: "column", md: "row" }}
        gap="4"
        justifyContent="space-between"
      >
        <Text color="fg.muted" fontSize="sm">
          © 2024 Prompt, All rights reserved. Innovation in progress.
        </Text>
        <HStack align="center" gap="4">
          <Link href="https://github.com/dgu-prompt/root_page">
            <IconButton
              rounded="full"
              variant="surface"
              bg="bg"
              _hover={{ bg: "bg.emphasized" }}
            >
              <GithubIcon />
            </IconButton>
          </Link>
          <ColorModeToggle />
        </HStack>
      </Flex>
    </Container>
  );
}
