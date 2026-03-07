import { Heading, Text, VStack, Flex, SimpleGrid } from '@chakra-ui/react';
import { LuShield, LuZap, LuCode } from 'react-icons/lu';
import { FormattedMessage } from 'react-intl';
import { PageLayout } from '../ui/layout/page-layout';
import { AnimatedButton } from '../ui/components/animated-button';
import { FeatureCard } from '../ui/components/feature-card';
import { PageMeta } from '../ui/components/page-meta';
import { ROUTES } from '../utilities/constants';
import { Link as RouterLink } from 'react-router';

const Home = () => {
  return (
    <PageLayout maxW="container.lg" py={16}>
      <PageMeta
        title="2026 Boilerplate"
        description="A modern, full-stack web application starter kit with TypeScript, React, and Node.js"
      />
      <VStack gap={16} align="stretch">
        <VStack gap={6} textAlign="center">
          <Heading as="h1" size="4xl" fontWeight="bold" lineHeight="1.2">
            <FormattedMessage id="home.title" />
          </Heading>
          <Text fontSize="xl" color="gray.500" maxW="600px" mx="auto">
            <FormattedMessage id="home.subtitle" />
          </Text>
          <Flex gap={4} pt={2}>
            <AnimatedButton asChild colorScheme="blue" size="lg">
              <RouterLink to={ROUTES.LOGIN}>
                <FormattedMessage id="home.getStarted" />
              </RouterLink>
            </AnimatedButton>
            <AnimatedButton asChild variant="outline" size="lg">
              <RouterLink to={ROUTES.ABOUT}>
                <FormattedMessage id="home.learnMore" />
              </RouterLink>
            </AnimatedButton>
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
