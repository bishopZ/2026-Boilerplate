import { Suspense, lazy, useCallback, useEffect, useOptimistic, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../redux/store';
import { increment } from '../redux/preferences';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { PageLayout } from '../ui/layout/page-layout';
import { FeatureErrorBoundary } from '../ui/components/feature-error-boundary';
import { LoadingFallback } from '../ui/components/loading-fallback';
import { PageMeta } from '../ui/components/page-meta';
import { useAnnounce } from '../hooks/use-announce';
import { registerCounterTool } from '../utilities/webmcp';

const ProductCounterSection = lazy(() => import('../ui/components/product-counter-section'));

const Product = () => {
  const { score } = useSelector((state: RootState) => state.preferences);
  const dispatch = useDispatch<AppDispatch>();
  const [optimisticScore, setOptimistic] = useOptimistic(score, (_prev: number, next: number) => next);
  const announce = useAnnounce();
  const scoreRef = useRef(score);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const incrementCounter = useCallback(() => {
    const nextScore = scoreRef.current + 1;
    scoreRef.current = nextScore;
    setOptimistic(nextScore);
    dispatch(increment());
    announce(`Score updated to ${String(nextScore)}`);

    return nextScore;
  }, [announce, dispatch, setOptimistic]);

  useEffect(() => {
    return registerCounterTool({ onIncrement: incrementCounter });
  }, [incrementCounter]);

  const handleIncrement = () => {
    incrementCounter();
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
          <FeatureErrorBoundary title="Counter Actions">
            <Suspense fallback={<LoadingFallback />}>
              <ProductCounterSection onIncrement={handleIncrement} />
            </Suspense>
          </FeatureErrorBoundary>
        </Box>
      </VStack>
    </PageLayout>
  );
};

export default Product;
