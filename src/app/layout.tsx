'use client';

import { ThemeProvider } from '@mui/material';
import { store, persistor } from '@store/store';
import { theme } from 'components/Theme/theme';
import { Montserrat } from 'next/font/google';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'styles/base/index.scss';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
      </head>
      <body className={montserrat.className}>
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
