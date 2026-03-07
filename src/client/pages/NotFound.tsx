import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { ROUTES } from '../utilities/constants';
import { AnimatedButton } from '../ui/components/animated-button';
import { PageLayout } from '../ui/layout/page-layout';
import { PageMeta } from '../ui/components/page-meta';

const NotFound = () => {
  return (
    <PageLayout py={20}>
      <PageMeta
        title="Page Not Found - 2026 Boilerplate"
        description="The requested page could not be found in the 2026 Boilerplate application."
      />
      <VStack gap={6} align="center" textAlign="center">
        <Text fontSize="9xl" fontWeight="bold" lineHeight="1" color="gray.300">
          404
        </Text>

        <Box>
          <Heading as="h1" size="xl" mb={2}>
            Page Not Found
          </Heading>
          <Text fontSize="lg" color="gray.500">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </Text>
        </Box>

        <VStack gap={3} pt={4}>
          <AnimatedButton asChild colorScheme="blue" size="lg">
            <RouterLink to={ROUTES.HOME}>Go to Home Page</RouterLink>
          </AnimatedButton>
          <AnimatedButton asChild variant="outline" size="md">
            <RouterLink to={ROUTES.ABOUT}>Learn About This Project</RouterLink>
          </AnimatedButton>
        </VStack>
      </VStack>
    </PageLayout>
  );
};

export default NotFound;
