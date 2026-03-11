import { Box, Heading, List, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { ROUTES } from '../utilities/constants';
import { AnimatedButton } from '../ui/components/animated-button';
import { PageLayout } from '../ui/layout/page-layout';
import { PageMeta } from '../ui/components/page-meta';

const Policies = () => {
  return (
    <PageLayout>
      <PageMeta
        title="Policy Writing Guide - 2026 Boilerplate"
        description="How to create your own Terms of Service and Privacy Policy for this project."
      />
      <VStack gap={6} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            Policy Writing Guide
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Replace this page with your project-specific legal documents before production launch.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={3}>
            1) Create two source documents
          </Heading>
          <List.Root ps={6} gap={2} listStyleType="disc">
            <List.Item>Terms of Service: account rules, acceptable use, limitations, and termination terms.</List.Item>
            <List.Item>Privacy Policy: data collection, processing, retention, sharing, and user rights.</List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={3}>
            2) Gather product-specific inputs
          </Heading>
          <List.Root ps={6} gap={2} listStyleType="disc">
            <List.Item>List all personal data your app stores or processes.</List.Item>
            <List.Item>Document cookie usage, analytics vendors, and third-party integrations.</List.Item>
            <List.Item>Define retention windows, deletion workflow, and contact channels for requests.</List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={3}>
            3) Replace placeholder content
          </Heading>
          <List.Root ps={6} gap={2} listStyleType="disc">
            <List.Item>Update title, body copy, and effective date with real legal text.</List.Item>
            <List.Item>Link the final policy pages in footer/navigation where users can always find them.</List.Item>
            <List.Item>Keep policy updates versioned and reflected in your changelog for auditability.</List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={3}>
            4) Validate before release
          </Heading>
          <List.Root ps={6} gap={2} listStyleType="disc">
            <List.Item>Run legal review in your target jurisdictions.</List.Item>
            <List.Item>Verify metadata and routes after publishing policy changes.</List.Item>
            <List.Item>Add or update E2E checks for policy links and page rendering.</List.Item>
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

export default Policies;
