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

const getPrefersReducedMotion = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Wraps page content with route-change transitions.
 */
export const PageTransition = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const prefersReducedMotion = getPrefersReducedMotion();

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

// Backward-compatible alias for older imports.
export const PageTransistion = PageTransition;
