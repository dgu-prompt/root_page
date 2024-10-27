import {
  Box,
  Center,
  Stack,
  Heading,
  Input,
  Text
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext"; // useAuth 훅을 가져옵니다
import { useState } from "react";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const fakeToken = "exampleToken123"; // 실제 API 요청 시 토큰을 받아옴
    login(fakeToken); // useAuth 훅의 login 함수로 상태 변경

    navigate("/rule-management");
  };

  return (
    <Center w="full" minH="80vh" alignItems="center" justifyContent="center">
      <Box maxW="md" w="full" p={8} rounded="lg" boxShadow="lg">
        <Stack spacing={4} mb={6}>
          <Heading fontSize="2xl" textAlign="center">
            Log in to your account
          </Heading>
          <Text color="gray.500" textAlign="center">
            Enter your credentials to access your account
          </Text>
        </Stack>
        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <Field label="Email address">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Stack spacing={6} mt={4}>
              <Button colorScheme="teal" size="lg" type="submit">
                Log In
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Center>
  );
}

export default Login;