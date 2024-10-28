import { useState } from "react";
import { Card, Center, Input, Stack, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { useAuth } from "./authContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError("Invalid username or password");
    }
    setIsLoading(false);
  };

  return (
    <Center flex="1" bg="bg.subtle">
      <Card.Root size="lg" variant="elevated">
        <Card.Header>
          <Text fontWeight="medium" textStyle="sm" color="fg">
            SecurityCircle
          </Text>
          <Card.Title>Log in to your account</Card.Title>
          <Card.Description>
            Enter your credentials to access your account
          </Card.Description>
        </Card.Header>
        <form onSubmit={handleSubmit}>
          <Card.Body>
            <Stack gap="4">
              <Field label="Username" invalid={!!loginError}>
                <Input
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>
              <Field
                label="Password"
                invalid={!!loginError}
                errorText={loginError}
              >
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <Button type="submit" flex="1" loading={isLoading}>
              Login
            </Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </Center>
  );
}

export default Login;
