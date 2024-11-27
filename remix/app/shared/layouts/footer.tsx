import {
  Box,
  Container,
  Flex,
  Link as ChakraLink,
  Text,
  Button,
} from "@chakra-ui/react";

import ToastButton from "@/components/ToastButton";
import ColorModeToggle from "@/components/color-mode-toggle";

function Footer() {
  return (
    <Box as="footer" pb="8" pt="40" width="full">
      <Container>
        <Flex
          align="center"
          direction={{ base: "column", md: "row" }}
          gap="4"
          justifyContent="space-between"
        >
          <Text color="gray.600" fontSize="sm">
            2024 © 프롬프트. All rights reserved.
          </Text>
          <Flex align="center" gap="4">
            <ToastButton />
            <ChakraLink href="https://github.com/dgu-prompt/root_page">
              <Button variant="surface">GitHub</Button>
            </ChakraLink>
            <ColorModeToggle />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
