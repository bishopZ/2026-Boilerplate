import { useOptimistic } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../redux/store';
import { increment } from '../redux/player';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { PageLayout } from '../ui/layout/page-layout';
import { AnimatedButton } from '../ui/components/animated-button';
import { PageMeta } from '../ui/components/page-meta';
import { useAnnounce } from '../hooks/use-announce';

const Product = () => {
  const { score } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch<AppDispatch>();
  const [optimisticScore, setOptimistic] = useOptimistic(score, (_prev: number, next: number) => next);
  const announce = useAnnounce();

  const handleIncrement = () => {
    setOptimistic(score + 1);
    dispatch(increment());
    announce(`Score updated to ${String(score + 1)}`);
  };

  return (
    <PageLayout variant="private">
      <PageMeta
        title="Product - 2026 Boilerplate"
        description="Product dashboard for the 2026 Boilerplate application"
      />
      <VStack gap={6} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={2}>
            Welcome to the Product Page ({optimisticScore})
          </Heading>
          <Text fontSize="lg" color="gray.600">
            You must login to see this page.
          </Text>
        </Box>

        <Box>
          <AnimatedButton
            colorScheme="blue"
            size="lg"
            onClick={handleIncrement}
          >
            Increment Counter
          </AnimatedButton>
        </Box>
      </VStack>
    </PageLayout>
  );
};

export default Product;
