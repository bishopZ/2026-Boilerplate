import { Box, Button, Container, Heading, Text, VStack, List } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { Footer } from '../components/layout/footer';
import { Header } from '../components/layout/header';

const About = () => {
  return (
    <>
      <Header />
      <Container maxW="container.md" py={8}>
        <VStack gap={6} align="stretch">
          <Box>
            <Heading as="h1" size="2xl" mb={4}>
              About 2025 Boilerplate
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={4}>
              A sophisticated starting point for building modern web applications.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Features
            </Heading>
            <List.Root gap={3}>
              <List.Item>
                <List.Indicator as={FiCheck} color="green.500" />
                React 19 with TypeScript for type-safe development
              </List.Item>
              <List.Item>
                <List.Indicator as={FiCheck} color="green.500" />
                Redux Toolkit for state management
              </List.Item>
              <List.Item>
                <List.Indicator as={FiCheck} color="green.500" />
                React Router for client-side routing
              </List.Item>
              <List.Item>
                <List.Indicator as={FiCheck} color="green.500" />
                Chakra UI for accessible, beautiful components
              </List.Item>
              <List.Item>
                <List.Indicator as={FiCheck} color="green.500" />
                Express.js backend with Passport.js authentication
              </List.Item>
              <List.Item>
                <List.Indicator as={FiCheck} color="green.500" />
                Encrypted local storage for data persistence
              </List.Item>
              <List.Item>
                <List.Indicator as={FiCheck} color="green.500" />
                Cypress for end-to-end testing
              </List.Item>
              <List.Item>
                <List.Indicator as={FiCheck} color="green.500" />
                ESLint with comprehensive rules
              </List.Item>
            </List.Root>
          </Box>

          <Box>
            <Button
              as={RouterLink}
              asChild
              colorScheme="blue"
            >
              <a href="/">Back to Home</a>
            </Button>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default About;