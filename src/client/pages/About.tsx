import { Box, Heading, Text, VStack, List } from '@chakra-ui/react';
import { LuCheck } from 'react-icons/lu';
import { BackHomeCta } from '../ui/components/back-home-cta';
import { PageLayout } from '../ui/layout/page-layout';
import { PageMeta } from '../ui/components/page-meta';

const About = () => {
  return (
    <PageLayout>
      <PageMeta
        title="About - 2026 Boilerplate"
        description="Learn how the 2026 Boilerplate organizes architecture, documentation, testing, and release workflows."
      />
      <VStack gap={6} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            About 2026 Boilerplate
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={4}>
            A documentation-first starter focused on maintainable architecture and predictable delivery workflows.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={3}>
            What this boilerplate optimizes for
          </Heading>
          <List.Root gap={3} listStyleType="none">
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              Clear system documentation for architecture, technology choices, and script workflows
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              Consistent frontend organization with reusable layouts, UI components, and route-level metadata
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              Typed Redux patterns with persisted and non-persisted slices designed for scale
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              Built-in i18n support (en/ar/fr), RTL handling, and translation key validation tooling
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              Accessibility and SEO defaults including skip links, aria-live announcements, and structured metadata
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              Tested release workflow with lint, type-check, and Cypress E2E coverage
            </List.Item>
            <List.Item>
              <List.Indicator as={LuCheck} color="green.500" />
              Contribution guidance that mirrors the structure and expectations of real production teams
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <BackHomeCta />
        </Box>
      </VStack>
    </PageLayout>
  );
};

export default About;
