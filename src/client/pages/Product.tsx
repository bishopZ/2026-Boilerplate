import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../components/data/store';
import { increment } from '../components/data/player';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { PageLayout } from '../components/layout/page-layout';

const Product = () => {
  const { score } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <PageLayout variant="private">
      <title>Product - 2026 Boilerplate</title>
      <meta name="description" content="Product dashboard for the 2026 Boilerplate application" />
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
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => dispatch(increment())}
          >
            Increment Counter
          </Button>
        </Box>
      </VStack>
    </PageLayout>
  );
};

export default Product;
