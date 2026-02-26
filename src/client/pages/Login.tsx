import { useId } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';
import { Footer } from '../components/layout/footer';
import { PublicHeader } from '../components/layout/header';
import { getCsrfToken } from '../shared/csrf';

const Login = () => {
  const id = useId();
  const usernameId = `${id}-username`;
  const passwordId = `${id}-password`;

  return (
    <>
      <title>Login - 2026 Boilerplate</title>
      <meta name="description" content="Sign in to the 2026 Boilerplate application" />
      <PublicHeader />
      <Container maxW="container.sm" py={8}>
        <Box as="main" role="main">
          <VStack gap={6} align="stretch">
            <Box>
              <Heading as="h1" size="2xl" mb={2}>
                2026 Boilerplate
              </Heading>
              <Text color="gray.600">Welcome to the login page.</Text>
            </Box>

            <form action="/login/password" method="post">
              <input type="hidden" name="_csrf" value={getCsrfToken()} />
              <VStack gap={4} align="stretch">
                <Field.Root>
                  <Field.Label htmlFor={usernameId}>Email address</Field.Label>
                  <Input
                    id={usernameId}
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    autoFocus
                    aria-required
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label htmlFor={passwordId}>Password</Field.Label>
                  <Input
                    id={passwordId}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    aria-required
                  />
                </Field.Root>
                <Button type="submit" colorScheme="blue" aria-label="Sign in">
                  Sign in
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
