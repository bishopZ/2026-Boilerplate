import { Box, Container, Heading, Text, Link } from '@chakra-ui/react';

const DEFAULT_CONTACT = 'support@domain.com';
const DEFAULT_TITLE = 'Something went wrong';

export const ErrorPage = ({ message }: { message: string }) => {
  return (
    <Container maxW="container.md" py={8}>
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4} color="red.500">
          {DEFAULT_TITLE}
        </Heading>
        <Text fontSize="lg" mb={4}>
          Please contact the site administrator at{' '}
          <Link href={`mailto:${DEFAULT_CONTACT}`} color="blue.500">
            {DEFAULT_CONTACT}
          </Link>
          .
        </Text>
        <Text fontSize="md" color="gray.600">
          {message}
        </Text>
      </Box>
    </Container>
  );
};
