import { Box, Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { useTheme } from 'next-themes';
import { FormattedMessage } from 'react-intl';
import { ROUTES } from '@/client/utilities/constants';

export const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? 'gray.400' : 'gray.600';
  const hoverColor = isDark ? 'gray.200' : 'gray.800';

  return (
    <Box as="footer" bg={isDark ? 'gray.800' : 'gray.100'} py={4} px={8} mt="auto">
      <Flex justify="center" align="center" gap={4} direction={{ base: 'column', sm: 'row' }}>
        <Text fontSize="sm" color={textColor}>
          <FormattedMessage id="footer.copyright" values={{ year: new Date().getFullYear() }} />
        </Text>
        <RouterLink to={ROUTES.POLICIES}>
          <Text
            as="span"
            fontSize="sm"
            color={textColor}
            _hover={{ color: hoverColor }}
            cursor="pointer"
            textDecoration="underline"
          >
            <FormattedMessage id="footer.policies" />
          </Text>
        </RouterLink>
      </Flex>
    </Box>
  );
};
