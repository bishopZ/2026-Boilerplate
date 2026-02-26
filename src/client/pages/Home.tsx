import { Box, Button, Container, Heading, Text, VStack, Flex, SimpleGrid } from '@chakra-ui/react';
import { LuShield, LuZap, LuCode } from 'react-icons/lu';
import { Footer } from '../components/layout/footer';
import { PublicHeader } from '../components/layout/header';
import { FeatureCard } from '../components/ui/feature-card';
import { Link as RouterLink } from 'react-router';

const Home = () => {
  return (
    <>
      <title>2026 Boilerplate</title>
      <meta name="description" content="A modern, full-stack web application starter kit with TypeScript, React, and Node.js" />
      <PublicHeader />
      <Box as="main">
        <Container maxW="container.lg" py={16}>
          <VStack gap={16} align="stretch">
            <VStack gap={6} textAlign="center">
              <Heading
                as="h1"
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="bold"
                lineHeight="1.2"
              >
                Build Modern Web Apps
              </Heading>
              <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.500" maxW="600px" mx="auto">
                A full-stack TypeScript starter kit with authentication, encrypted storage, and a modern developer experience.
              </Text>
              <Flex gap={4} pt={2}>
                <Button asChild colorScheme="blue" size="lg">
                  <RouterLink to="/login">Get Started</RouterLink>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <RouterLink to="/about">Learn More</RouterLink>
                </Button>
              </Flex>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
              <FeatureCard
                icon={LuZap}
                title="Fast Development"
                description="Vite-powered HMR with TypeScript, React 19, and Express running together seamlessly."
              />
              <FeatureCard
                icon={LuShield}
                title="Built-in Auth"
                description="Passport.js authentication with encrypted localStorage for secure client-side data persistence."
              />
              <FeatureCard
                icon={LuCode}
                title="Production Ready"
                description="ESLint, Cypress E2E tests, and Redux Toolkit — battle-tested tools configured and ready to go."
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
