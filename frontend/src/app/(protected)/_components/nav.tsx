"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Box, Container, HStack, IconButton, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import LogoutMenu from "./logout-menu";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";

const navItems = [
  { label: "대시보드", href: "/dashboard" },
  { label: "알림 규칙", href: "/rules" },
  { label: "제어 항목", href: "/controls" },
];

export default function Nav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

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
      <Container maxWidth="breakpoint-xl">
        <HStack alignItems="center" justifyContent="space-between" py="3">
          <Link href="/">
            <Text fontSize="md" fontWeight="semibold">
              SecurityCircle
            </Text>
          </Link>
          <DesktopNav navItems={navItems} pathname={pathname} />
          <HStack gap="2">
            <LogoutMenu>
              <Avatar size="sm" />
            </LogoutMenu>
            <IconButton
              aria-label="Toggle Menu"
              display={{ md: "none" }}
              onClick={toggleMobileMenu}
              rounded="full"
              variant="ghost"
              me="-2.5"
            >
              <Menu />
            </IconButton>
          </HStack>
        </HStack>
        {isMobileMenuOpen && (
          <MobileNav
            navItems={navItems}
            pathname={pathname}
            onClose={toggleMobileMenu}
          />
        )}
      </Container>
    </Box>
  );
}
