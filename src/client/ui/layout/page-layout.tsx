import { type ReactNode, Suspense } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { PublicHeader, PrivateHeader } from './header';
import { Footer } from './footer';
import { SkipLink } from '../components/skip-link';
import { LoadingSpinner } from '../components/loading-spinner';
import { PageTransition } from '../components/page-transition';

interface PageLayoutProps {
  variant?: 'public' | 'private';
  maxW?: string;
  py?: number;
  children: ReactNode;
}

export const PageLayout = ({
  variant = 'public',
  maxW = 'container.md',
  py = 8,
  children,
}: PageLayoutProps) => {
  const Header = variant === 'private' ? PrivateHeader : PublicHeader;

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <SkipLink />
      <Header />
      <Container as="main" id="main-content" maxW={maxW} py={py} flex="1" w="full">
        <PageTransition>
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </PageTransition>
      </Container>
      <Footer />
    </Box>
  );
};
