import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { ROUTES } from '../shared/constants';
import { PageLayout } from '../components/layout/page-layout';

const NotFound = () => {
  return (
    <PageLayout py={20}>
      <title>Page Not Found - 2026 Boilerplate</title>
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
          <Button asChild colorScheme="blue" size="lg">
            <RouterLink to={ROUTES.HOME}>Go to Home Page</RouterLink>
          </Button>
          <Button asChild variant="outline" size="md">
            <RouterLink to={ROUTES.ABOUT}>Learn About This Project</RouterLink>
          </Button>
        </VStack>
      </VStack>
    </PageLayout>
  );
};

export default NotFound;
