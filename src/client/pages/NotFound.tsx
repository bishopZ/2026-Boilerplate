import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { Footer } from '../components/layout/footer';
import { PublicHeader } from '../components/layout/header';

const NotFound = () => {
  return (
    <>
      <title>Page Not Found - 2026 Boilerplate</title>
      <PublicHeader />
      <Container maxW="container.md" py={20}>
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
              <RouterLink to="/">Go to Home Page</RouterLink>
            </Button>
            <Button asChild variant="outline" size="md">
              <RouterLink to="/about">Learn About This Project</RouterLink>
            </Button>
          </VStack>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default NotFound;
