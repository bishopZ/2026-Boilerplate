import { ROUTES } from '@/client/utilities/constants';
import { AnimatedButton } from './animated-button';
import { Link } from './link';

interface BackHomeCtaProps {
  label?: string;
}

export const BackHomeCta = ({ label = 'Back to Home' }: BackHomeCtaProps) => {
  return (
    <AnimatedButton asChild colorScheme="blue">
      <Link to={ROUTES.HOME}>{label}</Link>
    </AnimatedButton>
  );
};
