"use client";

import {
  Box,
  Link as ChakraLink,
  Container,
  Flex,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuGithub } from "react-icons/lu";

function Footer() {
  return (
    <Box w="full">
      <Container py="4" borderTopWidth="1px">
        <Flex
          justify="space-between"
          align="center"
          direction={{ base: "column", md: "row" }}
        >
          <Text fontSize="sm" color="gray.600">
            © 2024 Prompt. All rights reserved.
          </Text>
          <Stack direction="row" gap="4" mt={{ base: "4", md: "0" }}>
            <ChakraLink href="https://github.com/dgu-prompt/root_page">
              <IconButton aria-label="GitHub" variant="ghost">
                <LuGithub />
              </IconButton>
            </ChakraLink>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
