import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../components/data/store';
import { increment } from '../components/data/player';
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Footer } from '../components/layout/footer';
import { PrivateHeader } from '../components/layout/header';

const Product = () => {
  const { score } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <title>Product - 2026 Boilerplate</title>
      <meta name="description" content="Product dashboard for the 2026 Boilerplate application" />
      <PrivateHeader />
      <Container maxW="container.md" py={8}>
        <VStack gap={6} align="stretch">
          <Box>
            <Heading as="h1" size="2xl" mb={2}>
              Welcome to the Product Page ({score})
            </Heading>
            <Text fontSize="lg" color="gray.600">
              You must login to see this page.
            </Text>
          </Box>

          <Box>
            <motion.div
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'inline-block' }}
            >
              <Button
                colorScheme="blue"
                size="lg"
                onClick={() => dispatch(increment())}
              >
                Increment Counter
              </Button>
            </motion.div>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default Product;
