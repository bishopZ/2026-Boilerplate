import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { useTheme } from 'next-themes';

export const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? 'gray.400' : 'gray.600';
  const hoverColor = isDark ? 'gray.200' : 'gray.800';

  return (
    <Box as="footer" bg={isDark ? 'gray.800' : 'gray.100'} py={4} px={8} mt="auto">
      <Flex justify="center" align="center" gap={4} direction={{ base: 'column', sm: 'row' }}>
        <Text fontSize="sm" color={textColor}>
          &copy; {new Date().getFullYear()} [insert project name here]. All rights reserved.
        </Text>
        <Flex gap={4}>
          <RouterLink to="/privacy">
            <Link fontSize="sm" color={textColor} _hover={{ color: hoverColor }}>
              Privacy Policy
            </Link>
          </RouterLink>
          <RouterLink to="/terms">
            <Link fontSize="sm" color={textColor} _hover={{ color: hoverColor }}>
              Terms of Service
            </Link>
          </RouterLink>
        </Flex>
      </Flex>
    </Box>
  );
};
