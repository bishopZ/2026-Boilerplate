import { Heading, Text, VStack, Flex, SimpleGrid } from '@chakra-ui/react';
import { LuShield, LuZap, LuCode } from 'react-icons/lu';
import { FormattedMessage, useIntl } from 'react-intl';
import { PageLayout } from '../ui/layout/page-layout';
import { AnimatedButton } from '../ui/components/animated-button';
import { FeatureCard } from '../ui/components/feature-card';
import { Link } from '../ui/components/link';
import { PageMeta } from '../ui/components/page-meta';
import { ROUTES } from '../utilities/constants';

const Home = () => {
  const intl = useIntl();

  return (
    <PageLayout maxW="container.lg" py={16}>
      <PageMeta
        title="2026 Boilerplate"
        description="A modern, full-stack web application starter kit with TypeScript, React, and Node.js"
      />
      <VStack gap={16} align="stretch">
        <VStack gap={6} textAlign="center">
          <Heading
            as="h1"
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="bold"
            lineHeight="1.2"
          >
            <FormattedMessage id="home.title" />
          </Heading>
          <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.500" maxW="600px" mx="auto">
            <FormattedMessage id="home.subtitle" />
          </Text>
          <Flex gap={4} pt={2}>
            <AnimatedButton asChild colorScheme="blue" size="lg">
              <Link to={ROUTES.LOGIN}>
                <FormattedMessage id="home.getStarted" />
              </Link>
            </AnimatedButton>
            <AnimatedButton asChild variant="outline" size="lg">
              <Link to={ROUTES.ABOUT}>
                <FormattedMessage id="home.learnMore" />
              </Link>
            </AnimatedButton>
          </Flex>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          <FeatureCard
            icon={LuZap}
            title={intl.formatMessage({ id: 'home.feature.fast.title' })}
            description={intl.formatMessage({ id: 'home.feature.fast.description' })}
          />
          <FeatureCard
            icon={LuShield}
            title={intl.formatMessage({ id: 'home.feature.auth.title' })}
            description={intl.formatMessage({ id: 'home.feature.auth.description' })}
          />
          <FeatureCard
            icon={LuCode}
            title={intl.formatMessage({ id: 'home.feature.production.title' })}
            description={intl.formatMessage({ id: 'home.feature.production.description' })}
          />
        </SimpleGrid>
      </VStack>
    </PageLayout>
  );
};

export default Home;
