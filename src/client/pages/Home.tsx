import { Button, Heading, Text, VStack, Flex, SimpleGrid } from '@chakra-ui/react';
import { LuShield, LuZap, LuCode } from 'react-icons/lu';
import { FormattedMessage } from 'react-intl';
import { PageLayout } from '../components/layout/page-layout';
import { FeatureCard } from '../components/ui/feature-card';
import { Link as RouterLink } from 'react-router';

const Home = () => {
  return (
    <PageLayout maxW="container.lg" py={16}>
      <title>2026 Boilerplate</title>
      <meta name="description" content="A modern, full-stack web application starter kit with TypeScript, React, and Node.js" />
      <VStack gap={16} align="stretch">
        <VStack gap={6} textAlign="center">
          <Heading as="h1" size="4xl" fontWeight="bold" lineHeight="1.2">
            <FormattedMessage id="home.title" />
          </Heading>
          <Text fontSize="xl" color="gray.500" maxW="600px" mx="auto">
            <FormattedMessage id="home.subtitle" />
          </Text>
          <Flex gap={4} pt={2}>
            <Button asChild colorScheme="blue" size="lg">
              <RouterLink to="/login">
                <FormattedMessage id="home.getStarted" />
              </RouterLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <RouterLink to="/about">
                <FormattedMessage id="home.learnMore" />
              </RouterLink>
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
    </PageLayout>
  );
};

export default Home;
