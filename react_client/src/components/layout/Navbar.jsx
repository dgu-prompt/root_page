import { NavLink, useResolvedPath } from "react-router-dom";
import { Box, Container, Tabs, Text } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext"; // useAuth 훅을 사용

function NavItem({ children, to }) {
  return (
    <Tabs.Trigger value={to} asChild>
      <NavLink to={to}>{children}</NavLink>
    </Tabs.Trigger>
  );
}

function Login() {
  const { isAuthenticated, logout } = useAuth();
  if (isAuthenticated) return <NavItem to="/login">Login</NavItem>;
  return (
    <NavItem to="/logout" onClick={logout}>
      Logout
    </NavItem>
  );
}

function Navbar() {
  const { pathname } = useResolvedPath();

  return (
    <Box w="full">
      <Container alignContent="center" h="64px">
        <Tabs.Root value={pathname} activationMode="manual" variant="subtle">
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
            <Login />
          </Tabs.List>
          <Tabs.Content />
        </Tabs.Root>
      </Container>
    </Box>
  );
}

NavItem.propTypes = {
  children: PropTypes.node.isRequired, // children은 필수 요소
  to: PropTypes.string.isRequired, // to는 문자열이며 필수
};

export default Navbar;
