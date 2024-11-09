import { Link, NavLink, useResolvedPath } from "react-router-dom";
import { Box, Container, Tabs, Text } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";

function NavItem({ children, to }) {
  return (
    <Tabs.Trigger value={to} asChild>
      <NavLink to={to}>{children}</NavLink>
    </Tabs.Trigger>
  );
}
function Logout() {
  const { logout } = useAuth();

  return (
    <Tabs.Trigger asChild>
      <Link onClick={() => logout()}>Logout</Link>
    </Tabs.Trigger>
  );
}

function Navbar() {
  const { pathname } = useResolvedPath();
  const segment = "/" + pathname.split("/")[1];

  return (
    <Box w="full">
      <Container alignContent="center" py="3">
        <Tabs.Root value={segment} activationMode="manual" variant="subtle">
          <Tabs.List>
            <Tabs.Trigger asChild>
              <NavLink to="/">
                <Text color="fg" fontWeight="semibold" textStyle="sm">
                  SecurityCircle
                </Text>
              </NavLink>
            </Tabs.Trigger>
            <NavItem to="/">Dashboard</NavItem>
            <NavItem to="/rules">Rules</NavItem>
            <NavItem to="/controls">Controls</NavItem>
            <NavItem to="/settings">Settings</NavItem>
            <NavItem to="/backend-test">Backend Test</NavItem>
            <Logout />
          </Tabs.List>
        </Tabs.Root>
      </Container>
    </Box>
  );
}

export default Navbar;
