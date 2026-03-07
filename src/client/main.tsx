import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as DataProvider } from 'react-redux';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './ui/components/color-mode';
import App from './App';
import { store } from './redux/store';
import { ErrorPage } from './ui/components/error-page';
import { I18nProvider } from './utilities/i18n';
import { reportError } from './utilities/error-reporting';
import './ui/styles/index.css';

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
              <ErrorBoundary fallbackRender={ErrorFallback}>
                <App />
              </ErrorBoundary>
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
