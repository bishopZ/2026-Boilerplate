import { Box, Button, Container, Heading, Text, VStack, Flex, SimpleGrid } from '@chakra-ui/react';
import { LuShield, LuZap, LuCode } from 'react-icons/lu';
import { Footer } from '../components/layout/footer';
import { PublicHeader } from '../components/layout/header';
import { Link as RouterLink } from 'react-router';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <Box p={6} borderWidth="1px" borderRadius="lg" textAlign="center">
    <Flex justify="center" mb={3}>
      <Box as={Icon} boxSize={8} color="blue.500" />
    </Flex>
    <Heading as="h3" size="md" mb={2}>
      {title}
    </Heading>
    <Text fontSize="sm" color="gray.500">
      {description}
    </Text>
  </Box>
);

const Home = () => {
  return (
    <>
      <PublicHeader />
      <Box as="main">
        <Container maxW="container.lg" py={16}>
          <VStack gap={16} align="stretch">
            <VStack gap={6} textAlign="center">
              <Heading as="h1" size="4xl" fontWeight="bold" lineHeight="1.2">
                Build Modern Web Apps
              </Heading>
              <Text fontSize="xl" color="gray.500" maxW="600px" mx="auto">
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
