import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" py={4} px={8} mt="auto">
      <Flex justify="center" align="center" gap={4} direction={{ base: 'column', sm: 'row' }}>
        <Text fontSize="sm" color="gray.600">
          &copy; {new Date().getFullYear()} [insert project name here]. All rights reserved.
        </Text>
        <Flex gap={4}>
          <Link as={RouterLink} to="/privacy" fontSize="sm" color="gray.600" _hover={{ color: 'gray.800' }}>
            Privacy Policy
          </Link>
          <Link as={RouterLink} to="/terms" fontSize="sm" color="gray.600" _hover={{ color: 'gray.800' }}>
            Terms of Service
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};