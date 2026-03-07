import { IconButton } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { LuSun, LuMoon } from 'react-icons/lu';

export const ColorModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleColorMode = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <IconButton
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      variant="ghost"
      size="sm"
      onClick={toggleColorMode}
    >
      {isDark ? <LuSun /> : <LuMoon />}
    </IconButton>
  );
};
