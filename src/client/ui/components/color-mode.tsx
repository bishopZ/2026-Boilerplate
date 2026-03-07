import { ThemeProvider, type ThemeProviderProps } from 'next-themes';

export type ColorMode = 'light' | 'dark'

// Simplified version of the Vite example
export const ColorModeProvider = (props: ThemeProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      defaultTheme="light"
      {...props}
    />
  );
};
