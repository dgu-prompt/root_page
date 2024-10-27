import { Outlet, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, HStack } from '@chakra-ui/react';

function Navbar() {
  return (
    <>
      <Box bg="teal.500" px={4} py={2} color="white">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box fontSize="lg" fontWeight="bold">dgu-prompt-rulemanager</Box>
          <HStack>
            <Link as={RouterLink} to="/communication-test">통신 테스트</Link>
            <Link as={RouterLink} to="/">홈</Link>
            <Link as={RouterLink} to="/login">로그인</Link>
            <Link as={RouterLink} to="/dashboard">대시보드</Link>
            <Link as={RouterLink} to="/control-management">제어 항목 관리</Link>
            <Link as={RouterLink} to="/rule-management">알림 규칙 관리</Link>
            <Link as={RouterLink} to="/account-settings">계정 연결 설정</Link>
          </HStack>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}

export default Navbar;