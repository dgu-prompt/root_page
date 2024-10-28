import { Box, Container, Flex, Link, Text, Stack } from "@chakra-ui/react";
import {
  LuMail,
  LuInfo,
  LuHelpCircle,
  LuUser,
  LuCopyright,
} from "react-icons/lu";

function Footer() {
  return (
    <Box w="full" bg="bg.muted">
      <Container py="3">
        <Stack
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
        >
          <Stack
            direction={{ base: "column", md: "row" }}
          >
            <Flex align="center" px="4" py="3">
              <LuInfo size="18" style={{ marginRight: "4px" }} />
              <Text fontSize="sm">Version 0.1.0</Text>
            </Flex>
            <Flex align="center" px="4" py="3">
              <LuMail size="18" style={{ marginRight: "4px" }} />
              <Text fontSize="sm">Support: admin@example.com</Text>
            </Flex>
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            gapX="32px"
            gapY="8px"
          >
            <Flex align="center" px="4" py="3">
              <LuUser size="18" style={{ marginRight: "4px" }} />
              <Text fontSize="sm">Logged in as: admin_user</Text>
            </Flex>
            <Flex align="center" px="4" py="3">
              <LuHelpCircle size="18" style={{ marginRight: "4px" }} />
              <Link href="/help" fontSize="sm">
                Help
              </Link>
            </Flex>
            <Flex align="center">
              <LuCopyright size="18" style={{ marginRight: "4px" }} />
              <Text fontSize="sm">2024 Prompt</Text>
            </Flex>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
