import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as DataProvider } from 'react-redux';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { BrowserRouter } from 'react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './components/ui/color-mode';
import App from './App';
import { store } from './components/data/store';
import { ErrorPage } from './components/ui/error-page';
import './styles/reset.css';
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
            <BrowserRouter>
              <ErrorBoundary fallbackRender={ErrorFallback}>
                <App />
              </ErrorBoundary>
            </BrowserRouter>
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
