import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeUIProvider } from 'theme-ui';
import { configureAppStore } from './store/configureStore.js';
import { theme } from './styles/theme.js';
import App from './app/index.js';

const store = configureAppStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeUIProvider theme={theme}>
        <App />
      </ThemeUIProvider>
    </Provider>
  </React.StrictMode>
);