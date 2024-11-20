import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
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

function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav items shared by desktop and mobile
  const navItems = [
    { label: t("menu.dashboard"), to: "/" },
    { label: t("menu.rules"), to: "/rules" },
    { label: t("menu.controls"), to: "/controls" },
  ];

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  // Check if a nav item matches the current path
  const isActive = (path: string) => location.pathname === path;

  // Submit the logout form programmatically
  const submitLogout = () =>
    (document.getElementById("logout-form") as HTMLFormElement)?.submit();

  // Desktop Navigation Component
  const DesktopNav = () => (
    <HStack
      display={{ base: "none", md: "flex" }}
      left="50%"
      position="absolute"
      transform="translateX(-50%)"
    >
      {navItems.map((item) => (
        <Button
          asChild
          color={isActive(item.to) ? "fg" : "fg.muted"}
          fontWeight={isActive(item.to) ? "semibold" : "normal"}
          key={item.to}
          variant="plain"
        >
          <NavLink to={item.to}>{item.label}</NavLink>
        </Button>
      ))}
    </HStack>
  );

  // Mobile Navigation Component
  const MobileNav = () => (
    <Box display={{ md: "none" }}>
      <Stack mb="4">
        {navItems.map((item) => (
          <Button
            asChild
            key={item.to}
            onClick={toggleMobileMenu}
            variant={isActive(item.to) ? "subtle" : "ghost"}
          >
            <NavLink to={item.to}>{item.label}</NavLink>
          </Button>
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box
      backdropFilter="saturate(1.8) blur(20px)"
      backgroundColor="bg/80"
      borderBottomWidth="1px"
      position="sticky"
      top="0"
      width="full"
      zIndex="1100"
    >
      <Container>
        <Flex alignItems="center" justifyContent="space-between" py="2">
          {/* Logo */}
          <NavLink to="/">
            <Text fontSize="md" fontWeight="semibold">
              {t("appName")}
            </Text>
          </NavLink>

          {/* Desktop Navigation */}
          <DesktopNav />

          <Flex gap="2" me="-2.5">
            {/* Profile Menu (only visible on md and above) */}
            <MenuRoot positioning={{ placement: "bottom-end" }}>
              <MenuTrigger>
                <Avatar size="sm" />
              </MenuTrigger>
              <MenuContent zIndex="2200">
                <MenuItem onClick={submitLogout} value="logout">
                  <LuLogOut />
                  <Text ml="2">{t("menu.logout")}</Text>
                </MenuItem>
              </MenuContent>
            </MenuRoot>

            {/* Mobile Menu Toggle Button */}
            <IconButton
              aria-label="Toggle Menu"
              display={{ md: "none" }}
              onClick={toggleMobileMenu}
              rounded="full"
              variant="ghost"
            >
              <LuMenu />
            </IconButton>
          </Flex>

          {/* Hidden Logout Form */}
          <Form
            action="/logout"
            id="logout-form"
            method="post"
            style={{ display: "none" }}
          />
        </Flex>

        {/* Conditionally Render Mobile Nav */}
        {isMobileMenuOpen && <MobileNav />}
      </Container>
    </Box>
  );
}

export default Navbar;
