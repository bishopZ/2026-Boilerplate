import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Header = () => {
  return (
    <Box as="header" bg="gray.100" py={4} px={8} boxShadow="sm">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">
          <RouterLink to="/">2025 Boilerplate</RouterLink>
        </Heading>
        <Flex gap={4}>
          <Button as={RouterLink} asChild variant="ghost">
            <RouterLink to="/">Home</RouterLink>
          </Button>
          <Button as={RouterLink} asChild variant="ghost">
            <RouterLink to="/about">About</RouterLink>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};