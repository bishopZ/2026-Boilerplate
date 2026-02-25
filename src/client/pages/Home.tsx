import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Footer } from '../components/layout/footer';
import { PublicHeader } from '../components/layout/header';
import { Link } from '@tanstack/react-router';

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
              A modern, full-stack web application starter kit with TypeScript, React, and Node.js
            </Text>
          </Box>

          <Box>
            <Button
              asChild
              colorScheme="blue"
              size="lg"
            >
              <Link to="/login">Login</Link>
            </Button>
          </Box>

          <Box>
            <Button
              asChild
              variant="outline"
              colorScheme="blue"
            >
              <Link to="/about">About This Boilerplate</Link>
            </Button>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default Home;