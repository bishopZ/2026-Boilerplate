import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router';

const variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const reducedMotionVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
};

/**
 * Wraps page content with a fade + slide animation on route change.
 * Respects prefers-reduced-motion by disabling animations.
 */
export const PageTransition = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      key={pathname}
      variants={prefersReducedMotion ? reducedMotionVariants : variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
