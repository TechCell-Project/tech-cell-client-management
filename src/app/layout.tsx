'use client';

import { ThemeProvider } from '@mui/material/styles';
import { store, persistor } from '@store/store';
import { theme } from 'components/Theme/theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/base/index.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
    <head>
      <link rel='icon' href='/favicon.ico?v=2' />
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      <title>TechCell</title>
      <link
        href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
        rel='stylesheet'
      />
    </head>
    <body>
    <ToastContainer theme='colored' autoClose={3000} newestOnTop closeOnClick position='top-right' />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </ThemeProvider>
    </body>
    </html>
  );
}
