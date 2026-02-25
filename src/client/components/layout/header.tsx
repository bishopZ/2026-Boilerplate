import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

export const PublicHeader = () => {
  return (
    <Box as="header" bg="gray.100" py={4} px={8} boxShadow="sm">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">
          <Link to="/">2026 Boilerplate</Link>
        </Heading>
        <Flex gap={4}>
          <Button asChild variant="ghost">
            <Link to="/">Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/about">About</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/login">Login</Link>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export const PrivateHeader = () => {
  return (
    <Box as="header" bg="gray.100" py={4} px={8} boxShadow="sm">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">
          <Link to="/product">2026 Boilerplate</Link>
        </Heading>
        <Flex gap={4}>
          <Button asChild variant="ghost">
            <Link to="/product">Product</Link>
          </Button>
          <Button asChild variant="ghost">
            <a href="/logout">Logout</a>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
