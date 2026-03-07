import { useState } from 'react';
import { Box, Flex, Heading, Button, IconButton, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { useTheme } from 'next-themes';
import { LuMenu, LuX } from 'react-icons/lu';
import { ROUTES } from '@/client/utilities/constants';
import { ColorModeToggle } from '../components/color-mode-toggle';
import { LanguageSwitcher } from '../components/language-switcher';

interface NavItem {
  label: string;
  to: string;
  isExternal?: boolean;
}

const PUBLIC_NAV: NavItem[] = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'About', to: ROUTES.ABOUT },
  { label: 'Login', to: ROUTES.LOGIN },
];

const PRIVATE_NAV: NavItem[] = [
  { label: 'Product', to: ROUTES.PRODUCT },
  { label: 'Logout', to: ROUTES.LOGOUT, isExternal: true },
];

const NavLinks = ({ items, onClose }: { items: NavItem[]; onClose?: () => void }) => (
  <>
    {items.map(({ label, to, isExternal }) => (
      <Button
        key={to}
        asChild
        variant="ghost"
        minH="44px"
        onClick={onClose}
      >
        {isExternal
          ? <a href={to}>{label}</a>
          : <RouterLink to={to}>{label}</RouterLink>
        }
      </Button>
    ))}
  </>
);

const Header = ({ variant }: { variant: 'public' | 'private' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = variant === 'private' ? PRIVATE_NAV : PUBLIC_NAV;
  const logoTo = variant === 'private' ? ROUTES.PRODUCT : ROUTES.HOME;

  return (
    <>
      <Box
        as="header"
        bg={isDark ? 'gray.800' : 'gray.100'}
        color={isDark ? 'gray.100' : 'inherit'}
        py={4}
        px={8}
        boxShadow="sm"
      >
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="lg">
            <RouterLink to={logoTo}>2026 Boilerplate</RouterLink>
          </Heading>

          <Flex gap={4} align="center" display={{ base: 'none', md: 'flex' }}>
            <NavLinks items={navItems} />
            <LanguageSwitcher />
            <ColorModeToggle />
          </Flex>

          <Flex align="center" display={{ base: 'flex', md: 'none' }}>
            <LanguageSwitcher />
            <ColorModeToggle />
            <IconButton
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              variant="ghost"
              size="lg"
              minH="44px"
              minW="44px"
              onClick={() => { setMobileOpen(!mobileOpen); }}
            >
              {mobileOpen ? <LuX /> : <LuMenu />}
            </IconButton>
          </Flex>
        </Flex>

        {mobileOpen && (
          <VStack
            align="stretch"
            pt={4}
            gap={1}
            display={{ base: 'flex', md: 'none' }}
          >
            <NavLinks items={navItems} onClose={() => { setMobileOpen(false); }} />
            <LanguageSwitcher />
          </VStack>
        )}
      </Box>
    </>
  );
};

export const PublicHeader = () => <Header variant="public" />;
export const PrivateHeader = () => <Header variant="private" />;
