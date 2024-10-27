import { Box, Center, Stack, Heading, Input, Text } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';

function Login() {
  return (
    <>
      <Center
        w="full"
        minH="80vh"
        d="flex"
        alignItems="center"
        justifyContent="center"
      // bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Box
          maxW="md"
          w="full"
          // bg={useColorModeValue('white', 'gray.700')}
          p={8}
          rounded="lg"
          boxShadow="lg"
        >
          <Stack spacing={4} mb={6}>
            <Heading fontSize="2xl" textAlign="center">
              Log in to your account
            </Heading>
            <Text color="gray.500" textAlign="center">
              Enter your credentials to access your account
            </Text>
          </Stack>
          <Stack spacing={4}>
            <Field label="Email address">
              <Input type="email" placeholder="Enter your email" />
            </Field>
            <Field label="Password">
              <Input type="password" placeholder="Enter your password" />
            </Field>
            {/* <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" />
            </FormControl> */}
            <Stack spacing={6} mt={4}>
              <Button colorScheme="teal" size="lg" type="submit">
                Log In
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Center >
    </>
  );
}

export default Login
