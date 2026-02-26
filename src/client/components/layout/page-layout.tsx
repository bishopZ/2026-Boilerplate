import type { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';
import { PublicHeader, PrivateHeader } from './header';
import { Footer } from './footer';

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
      <Header />
      <Container as="main" maxW={maxW} py={py}>
        {children}
      </Container>
      <Footer />
    </>
  );
};
