import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { Footer } from '../components/layout/footer';
import { PublicHeader } from '../components/layout/header';

const Privacy = () => {
  return (
    <>
      <title>Privacy Policy - 2026 Boilerplate</title>
      <meta name="description" content="Privacy policy for the 2026 Boilerplate application" />
      <PublicHeader />
      <Container maxW="container.md" py={8}>
        <VStack gap={6} align="stretch">
          <Box>
            <Heading as="h1" size="2xl" mb={4}>
              Privacy Policy
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={4}>
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Information Collection
            </Heading>
            <Text mb={4}>
              We collect information that you provide directly to us when you use our services.
              This may include personal information such as your name, email address, and any other
              information you choose to provide.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Data Usage
            </Heading>
            <Text mb={4}>
              We use the information we collect to provide, maintain, and improve our services,
              to process transactions, to send you technical notices and support messages, and to
              respond to your comments and questions.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Data Storage and Security
            </Heading>
            <Text mb={4}>
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. Your data
              may be stored using encrypted local storage and secure server-side storage.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Cookies
            </Heading>
            <Text mb={4}>
              We use session cookies to maintain your login state and provide a secure authentication
              experience. These cookies are essential for the functioning of our service and are not
              used for tracking purposes.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              User Rights
            </Heading>
            <Text mb={4}>
              You have the right to access, update, or delete your personal information at any time.
              If you wish to exercise these rights, please contact us using the information
              provided below.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Contact Information
            </Heading>
            <Text mb={4}>
              If you have any questions about this Privacy Policy, please contact us at
              [insert contact email here].
            </Text>
          </Box>

          <Box>
            <Button
              as={RouterLink}
              asChild
              colorScheme="blue"
            >
              <a href="/">Back to Home</a>
            </Button>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default Privacy;
