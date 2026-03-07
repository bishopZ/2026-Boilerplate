import { Box, Heading, Text, VStack, List } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { LuCheck } from 'react-icons/lu';
import { ROUTES } from '../utilities/constants';
import { AnimatedButton } from '../ui/components/animated-button';
import { PageLayout } from '../ui/layout/page-layout';
import { PageMeta } from '../ui/components/page-meta';

const About = () => {
  return (
    <PageLayout>
      <PageMeta
        title="About - 2026 Boilerplate"
        description="Learn about the 2026 Boilerplate — a full-stack starter kit with React, Express, Redux, and Chakra UI"
      />
      <VStack gap={6} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            About 2026 Boilerplate
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={4}>
            A sophisticated starting point for building modern web applications.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={3}>
            Features
          </Heading>
          <List.Root gap={3} listStyleType="none">
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              React 19 with TypeScript for type-safe development
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              Redux Toolkit for state management
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              React Router for client-side routing
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              Chakra UI for accessible, beautiful components
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              Express.js backend with Passport.js authentication
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              Encrypted local storage for data persistence
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              Cypress for end-to-end testing
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              ESLint with comprehensive rules
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <AnimatedButton
            asChild
            colorScheme="blue">
            <RouterLink to={ROUTES.HOME}>Back to Home</RouterLink>
          </AnimatedButton>
        </Box>
      </VStack>
    </PageLayout>
  );
};

export default About;
