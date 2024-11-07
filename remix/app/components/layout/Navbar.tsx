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
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuLogOut, LuMenu } from "react-icons/lu";
import { Button } from "~/components/ui/button";

function Navbar() {
  const { t } = useTranslation();
  const navItems = [
    { label: t("menu.dashboard"), to: "/" },
    { label: t("menu.rules"), to: "/rules" },
    { label: t("menu.controls"), to: "/controls" },
  ];
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <Box
      backdropFilter="blur(8px)"
      bg="bg/80"
      borderBottomWidth="1px"
      position="sticky"
      top="0"
      width="full"
      zIndex="1100"
    >
      <Container>
        <Flex alignItems="center" h="48px" justifyContent="space-between">
          <Flex alignItems="center">
            {/* Logo */}
            <NavLink to="/">
              <Text fontSize="md" fontWeight="semibold" mr="4">
                {t("appName")}
              </Text>
            </NavLink>
          </Flex>

          {/* Desktop Nav */}
          <HStack
            align="center"
            display={{ base: "none", md: "flex" }}
            gap="0"
            h="full"
            left="50%"
            position="absolute"
            top="0"
            translate="-50%"
          >
            {navItems.map((item) => (
              <Button
                asChild
                color={location.pathname === item.to ? "fg" : "fg.muted"}
                key={item.to}
                variant="plain"
              >
                <NavLink to={item.to}>{item.label}</NavLink>
              </Button>
            ))}
          </HStack>

          <Flex>
            {/* <Logout /> */}
            <Box display={{ base: "none", md: "flex" }}>
              <Form action="/logout" method="post">
                <IconButton
                  aria-label={t("menu.logout")}
                  type="submit"
                  variant="plain"
                >
                  <LuLogOut />
                </IconButton>
              </Form>
            </Box>
          </Flex>

          {/* Mobile Hamburger Menu */}
          <IconButton
            display={{ md: "none" }}
            me={"-10px"}
            onClick={handleToggle}
            variant="plain"
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
                  asChild
                  key={item.to}
                  onClick={handleToggle}
                  variant={location.pathname === item.to ? "subtle" : "ghost"}
                >
                  <NavLink to={item.to}>{item.label}</NavLink>
                </Button>
              ))}
              <Form action="/logout" method="post">
                <Button type="submit" variant="ghost">
                  {t("menu.logout")}
                </Button>
              </Form>
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Navbar;
