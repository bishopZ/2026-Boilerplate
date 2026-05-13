import { Link as ChakraLink, type LinkProps } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { LuExternalLink } from 'react-icons/lu';
import type { PropsWithChildren } from 'react';

type AppLinkProps = PropsWithChildren<Omit<LinkProps, 'href'>> & {
  to: string;
  isExternal?: boolean;
  reloadDocument?: boolean;
};

export const Link = ({
  children,
  to,
  isExternal = false,
  reloadDocument = false,
  ...linkProps
}: AppLinkProps) => {
  if (isExternal) {
    return (
      <ChakraLink
        href={to}
        target="_blank"
        display="inline-flex"
        alignItems="center"
        gap={1}
        {...linkProps}
      >
        {children}
        <LuExternalLink aria-hidden />
      </ChakraLink>
    );
  }

  return (
    <ChakraLink asChild {...linkProps}>
      <RouterLink to={to} reloadDocument={reloadDocument}>
        {children}
      </RouterLink>
    </ChakraLink>
  );
};
