import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Footer } from '../components/layout/footer';
import { PublicHeader } from '../components/layout/header';
import { Link as RouterLink } from 'react-router';

const Home = () => {
  return (
    <>
      <PublicHeader />
      <Container maxW="container.md" py={8}>
        <VStack gap={6} align="stretch">
          <Box>
            <Heading as="h1" size="2xl" mb={2}>
              Welcome to the 2026 Boilerplate!
            </Heading>
            <Text fontSize="lg" color="gray.600">
              A modern, full-stack web application starter with TypeScript, React, and Node.js
            </Text>
          </Box>

          <Box>
            <Button
              asChild
              colorScheme="blue"
              size="lg"
            >
              <a href="/login">Login</a>
            </Button>
          </Box>

          <Box>
            <Button
              asChild
              variant="outline"
              colorScheme="blue"
            >
              <RouterLink to="/about">About This Boilerplate</RouterLink>
            </Button>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default Home;