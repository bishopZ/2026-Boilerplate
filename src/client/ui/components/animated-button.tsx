import { Button, type ButtonProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const TAP_ANIMATION = { scale: 0.93 };
const TAP_TRANSITION = { duration: 0.15 };

export const AnimatedButton = ({ children, ...buttonProps }: ButtonProps) => {
  const isDisabled = [buttonProps.disabled, buttonProps.loading].some(Boolean);

  return (
    <motion.div
      style={{ display: 'inline-flex' }}
      whileTap={isDisabled ? undefined : TAP_ANIMATION}
      transition={isDisabled ? undefined : TAP_TRANSITION}
    >
      <Button {...buttonProps}>{children}</Button>
    </motion.div>
  );
};
