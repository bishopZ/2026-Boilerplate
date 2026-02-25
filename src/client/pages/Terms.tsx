import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { Footer } from '../components/layout/footer';
import { PublicHeader } from '../components/layout/header';

/* eslint-disable-next-line max-lines-per-function */
const Terms = () => {
  return (
    <>
      <PublicHeader />
      <Container maxW="container.md" py={8}>
        <VStack gap={6} align="stretch">
          <Box>
            <Heading as="h1" size="2xl" mb={4}>
              Terms of Service
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={4}>
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Acceptance of Terms
            </Heading>
            <Text mb={4}>
              By accessing and using this service, you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to abide by the above, please
              do not use this service.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Use License
            </Heading>
            <Text mb={4}>
              Permission is granted to temporarily use this service for personal, non-commercial
              transitory viewing only. This is the grant of a license, not a transfer of title,
              and under this license you may not modify or copy the materials, use the materials
              for any commercial purpose, or attempt to reverse engineer any software contained
              in the service.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              User Account
            </Heading>
            <Text mb={4}>
              You are responsible for maintaining the confidentiality of your account and password.
              You agree to accept responsibility for all activities that occur under your account.
              You must notify us immediately of any unauthorized use of your account.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Prohibited Uses
            </Heading>
            <Text mb={4}>
              You may not use our service in any way that causes, or may cause, damage to the
              service or impairment of the availability or accessibility of the service. You may
              not use our service in any way which is unlawful, illegal, fraudulent, or harmful,
              or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Content
            </Heading>
            <Text mb={4}>
              Our service allows you to post, link, store, share and otherwise make available
              certain information. You are responsible for the content that you post on or through
              the service, including its legality, reliability, and appropriateness.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Termination
            </Heading>
            <Text mb={4}>
              We may terminate or suspend your account and bar access to the service immediately,
              without prior notice or liability, under our sole discretion, for any reason
              whatsoever and without limitation, including but not limited to a breach of the Terms.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Disclaimer
            </Heading>
            <Text mb={4}>
              The materials on this service are provided on an 'as is' basis. We make no warranties,
              expressed or implied, and hereby disclaim and negate all other warranties including
              without limitation, implied warranties or conditions of merchantability, fitness for
              a particular purpose, or non-infringement of intellectual property or other violation
              of rights.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Limitation of Liability
            </Heading>
            <Text mb={4}>
              In no event shall we or our suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption)
              arising out of the use or inability to use the materials on this service, even if
              we or an authorized representative has been notified orally or in writing of the
              possibility of such damage.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Changes to Terms
            </Heading>
            <Text mb={4}>
              We reserve the right, at our sole discretion, to modify or replace these Terms at
              any time. If a revision is material, we will provide at least 30 days notice prior
              to any new terms taking effect. What constitutes a material change will be determined
              at our sole discretion.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Contact Information
            </Heading>
            <Text mb={4}>
              If you have any questions about these Terms of Service, please contact us at
              [insert contact email here].
            </Text>
          </Box>

          <Box>
            <Button
              asChild
              colorScheme="blue"
            >
              <Link to="/">Back to Home</Link>
            </Button>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default Terms;
