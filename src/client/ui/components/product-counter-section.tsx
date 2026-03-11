import { Box } from '@chakra-ui/react';
import { AnimatedButton } from './animated-button';

interface ProductCounterSectionProps {
  onIncrement: () => void;
}

const ProductCounterSection = ({ onIncrement }: ProductCounterSectionProps) => {
  return (
    <Box>
      <AnimatedButton
        colorScheme="blue"
        size="lg"
        onClick={onIncrement}
      >
        Increment Counter
      </AnimatedButton>
    </Box>
  );
};

export default ProductCounterSection;
