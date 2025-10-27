import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../components/data/store';
import { increment } from '../components/data/player';
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Footer } from '../components/layout/footer';
import { Header } from '../components/layout/header';

const Home = () => {
  const { score } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Header />
      <Container maxW="container.md" py={8}>
        <VStack gap={6} align="stretch">
          <Box>
            <Heading as="h1" size="2xl" mb={2}>
              Welcome to the 2025 Boilerplate! ({score})
            </Heading>
            <Text fontSize="lg" color="gray.600">
              A modern, full-stack web application starter with TypeScript, React, and Node.js
            </Text>
          </Box>

          <Box>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={() => dispatch(increment())}
            >
              Increment Counter
            </Button>
          </Box>

          <Box>
            <Button
              as={RouterLink}
              asChild
              variant="outline"
              colorScheme="blue"
            >
              <a href="/about">About This Boilerplate</a>
            </Button>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default Home;