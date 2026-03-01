import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './lib/redux/store.ts';
import AppProvider from './context/AppContext.tsx';
import ToastProvider from './components/ToastProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <ToastProvider />
    <Provider store={store}>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </Provider>
  </AppProvider>,
);
