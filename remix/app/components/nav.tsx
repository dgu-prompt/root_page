"use client";

import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, NavLink, useLocation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { LuLogOut, LuMenu } from "react-icons/lu";
import { useState } from "react";

function Nav() {
  const navItems = [
    { label: "Dashboard", to: "/" },
    { label: "Rules", to: "/rules/edit" },
    { label: "Controls", to: "/controls" },
  ];
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <Box
      width="full"
      bg="bg/80"
      position="sticky"
      top="0"
      zIndex="1100"
      backdropFilter="blur(8px)"
      borderBottomWidth="1px"
    >
      <Container>
        <Flex alignItems="center" justifyContent="space-between" h="48px">
          <Flex alignItems="center">
            {/* Logo */}
            <NavLink to="/">
              <Text fontSize="md" fontWeight="semibold" mr="4">
                SecurityCircle
              </Text>
            </NavLink>
          </Flex>

          {/* Desktop Nav */}
          <HStack
            align="center"
            display={{ base: "none", md: "flex" }}
            position="absolute"
            top="0"
            left="50%"
            translate="-50%"
            h="full"
            gap="0"
          >
            {navItems.map((item) => (
              <Button
                key={item.to}
                variant="plain"
                color={location.pathname === item.to ? "fg" : "fg.muted"}
                asChild
              >
                <NavLink to={item.to}>{item.label}</NavLink>
              </Button>
            ))}
          </HStack>

          <Flex>
            {/* <Logout /> */}
            <Box display={{ base: "none", md: "flex" }}>
              <Form action="/logout" method="post">
                <IconButton aria-label="Logout" type="submit" variant="plain">
                  <LuLogOut />
                </IconButton>
              </Form>
            </Box>
          </Flex>

          {/* Mobile Hamburger Menu */}
          <IconButton
            display={{ md: "none" }}
            variant="plain"
            onClick={handleToggle}
            me={"-10px"}
          >
            <LuMenu />
          </IconButton>
        </Flex>

        {/* Mobile Menu */}
        {isOpen && (
          <Box display={{ md: "none" }} mt={4}>
            <Stack>
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  variant={location.pathname === item.to ? "subtle" : "ghost"}
                  onClick={handleToggle}
                  asChild
                >
                  <NavLink to={item.to}>{item.label}</NavLink>
                </Button>
              ))}
              <Form action="/logout" method="post">
                <Button type="submit" variant="ghost">
                  Logout
                </Button>
              </Form>
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Nav;
