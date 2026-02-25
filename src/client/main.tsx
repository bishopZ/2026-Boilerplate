import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as DataProvider } from 'react-redux';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { RouterProvider } from '@tanstack/react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './components/ui/color-mode';
import { router } from './router';
import { store } from './components/data/store';
import { ErrorPage } from './components/ui/error-page';
import './styles/index.css';

export const ErrorFallback = ({ error }: FallbackProps) => (
  <ErrorPage message={error.message} />
);

const renderApp = (container: HTMLElement) => {
  createRoot(container).render(
    <StrictMode>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <DataProvider store={store}>
            <ErrorBoundary fallbackRender={ErrorFallback}>
              <RouterProvider router={router} />
            </ErrorBoundary>
          </DataProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </StrictMode>,
  );
};

const root = document.getElementById('root');
if (root) {
  renderApp(root);
} else {
  console.error('Root element not found');
}
