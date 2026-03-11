import { useCallback, useEffect, useOptimistic, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../redux/store';
import { increment } from '../redux/preferences';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { PageLayout } from '../ui/layout/page-layout';
import { AnimatedButton } from '../ui/components/animated-button';
import { PageMeta } from '../ui/components/page-meta';
import { useAnnounce } from '../hooks/use-announce';

const WEB_MCP_INCREMENT_TOOL = 'increment-counter';

interface ModelContextToolResult {
  content: {
    type: 'text';
    text: string;
  }[];
}

interface ModelContextTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, never>;
    required: string[];
  };
  execute: () => ModelContextToolResult;
}

interface BrowserModelContext {
  registerTool: (tool: ModelContextTool) => void;
  unregisterTool: (toolName: string) => void;
}

type NavigatorWithModelContext = Navigator & { modelContext?: BrowserModelContext };

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
    // WebMCP API proposal reference: https://github.com/webmachinelearning/webmcp/blob/main/docs/proposal.md
    const { modelContext } = navigator as NavigatorWithModelContext;

    if (modelContext === undefined) {
      return;
    }

    modelContext.registerTool({
      name: WEB_MCP_INCREMENT_TOOL,
      description: 'Increment the product page counter by one.',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
      execute: () => {
        const nextScore = incrementCounter();

        return {
          content: [
            {
              type: 'text',
              text: `Counter incremented to ${String(nextScore)}.`,
            },
          ],
        };
      },
    });

    return () => {
      modelContext.unregisterTool(WEB_MCP_INCREMENT_TOOL);
    };
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
