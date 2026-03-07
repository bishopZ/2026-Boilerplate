import { Box, Flex, Heading, Text } from '@chakra-ui/react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <Box p={6} borderWidth="1px" borderRadius="lg" textAlign="center">
    <Flex justify="center" mb={3}>
      <Box as={Icon} boxSize={8} color="blue.500" />
    </Flex>
    <Heading as="h3" size="md" mb={2}>
      {title}
    </Heading>
    <Text fontSize="sm" color="gray.500">
      {description}
    </Text>
  </Box>
);
