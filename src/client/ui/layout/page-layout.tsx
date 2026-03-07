import { type ReactNode, Suspense } from 'react';
import { Container } from '@chakra-ui/react';
import { PublicHeader, PrivateHeader } from './header';
import { Footer } from './footer';
import { SkipLink } from '../components/skip-link';
import { LoadingSpinner } from '../components/loading-spinner';
import { PageTransistion } from '../components/page-transistion';

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
    <>
      <SkipLink />
      <Header />
      <Container as="main" id="main-content" maxW={maxW} py={py}>
        <PageTransistion>
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </PageTransistion>
      </Container>
      <Footer />
    </>
  );
};
