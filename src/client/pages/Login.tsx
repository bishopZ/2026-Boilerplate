import { useId } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';
import { PageLayout } from '../components/layout/page-layout';
import { getCsrfToken } from '../shared/csrf';

const Login = () => {
  const id = useId();
  const usernameId = `${id}-username`;
  const passwordId = `${id}-password`;

  return (
    <PageLayout maxW="container.sm">
      <title>Login - 2026 Boilerplate</title>
      <meta name="description" content="Sign in to the 2026 Boilerplate application" />
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
    </PageLayout>
  );
};

export default Login;
