import type { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';
import { PublicHeader, PrivateHeader } from './header';
import { Footer } from './footer';
import { SkipLink } from '../ui/skip-link';

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
      <Container as="main" id="main-content" tabIndex={-1} maxW={maxW} py={py}>
        {children}
      </Container>
      <Footer />
    </>
  );
};
