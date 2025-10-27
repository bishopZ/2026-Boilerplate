import { Box, Flex, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" py={4} px={8} mt="auto">
      <Flex justify="center">
        <Text fontSize="sm" color="gray.600">
          &copy; {new Date().getFullYear()} 2025 Boilerplate. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};