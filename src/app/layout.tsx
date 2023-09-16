"use client";

import { SnackbarClose } from "@components/Common";
import { Dynamic } from "@components/Shared";
import { ThemeProvider } from "@mui/material";
import { store, persistor } from "@store/store";
import { theme } from "components/Theme/theme";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "styles/base/index.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Dynamic>
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              maxSnack={3}
              action={(key) => <SnackbarClose key={key} />}
            >
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  {children}
                </PersistGate>
              </Provider>
            </SnackbarProvider>
          </ThemeProvider>
        </Dynamic>
      </body>
    </html>
  );
}
