import { Alert, Box, Heading, Text } from '@chakra-ui/react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import type { ReactNode } from 'react';
import { reportError } from '@/client/utilities/error-reporting';

interface FeatureErrorBoundaryProps {
  children: ReactNode;
  title?: string;
}

const FeatureFallback = ({ error }: FallbackProps) => {
  const message = error instanceof Error ? error.message : String(error);
  reportError(error, { context: 'FeatureErrorBoundary' });

  return (
    <Alert.Root status="error" borderRadius="md">
      <Alert.Indicator />
      <Box>
        <Heading as="h3" size="sm" mb={1}>
          This section is temporarily unavailable.
        </Heading>
        <Text fontSize="sm" color="fg.muted">
          {message}
        </Text>
      </Box>
    </Alert.Root>
  );
};

export const FeatureErrorBoundary = ({
  children,
  title,
}: FeatureErrorBoundaryProps) => {
  if (title) {
    return (
      <Box>
        <Heading as="h2" size="md" mb={3}>
          {title}
        </Heading>
        <ErrorBoundary fallbackRender={FeatureFallback}>
          {children}
        </ErrorBoundary>
      </Box>
    );
  }

  return (
    <ErrorBoundary fallbackRender={FeatureFallback}>
      {children}
    </ErrorBoundary>
  );
};
