'use client';

import React from 'react';
import { persistor, store } from '@store/store';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@components/Theme/theme';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer
        theme="colored"
        autoClose={3000}
        newestOnTop
        closeOnClick
        position="top-right"
      />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
};
