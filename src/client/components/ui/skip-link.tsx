import { Box, Link } from '@chakra-ui/react';

export const SkipLink = () => (
  <Box
    as="nav"
    aria-label="Skip navigation"
    position="absolute"
    top="-100px"
    left="0"
    zIndex="skipLink"
    _focusWithin={{ top: '0' }}
  >
    <Link
      href="#main-content"
      bg="blue.500"
      color="white"
      px={4}
      py={2}
      fontWeight="bold"
      _focus={{ outline: '2px solid', outlineOffset: '2px' }}
    >
      Skip to main content
    </Link>
  </Box>
);
