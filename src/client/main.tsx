import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as DataProvider } from 'react-redux';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { BrowserRouter } from 'react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './components/ui/color-mode';
import App from './App';
import { store } from './components/data/store';
import { ErrorPage } from './components/ui/error-page';
import { I18nProvider } from './shared/i18n';
import { reportError } from './shared/error-reporting';
import './styles/index.css';

export const ErrorFallback = ({ error }: FallbackProps) => {
  const message = error instanceof Error ? error.message : String(error);
  reportError(error, { context: 'ErrorBoundary' });
  return <ErrorPage message={message} />;
};

const renderApp = (container: HTMLElement) => {
  createRoot(container).render(
    <StrictMode>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <DataProvider store={store}>
            <I18nProvider>
              <BrowserRouter>
                <ErrorBoundary fallbackRender={ErrorFallback}>
                  <App />
                </ErrorBoundary>
              </BrowserRouter>
            </I18nProvider>
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
  reportError('Root element not found', { context: 'bootstrap' });
}
