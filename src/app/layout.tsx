'use client';

import React from 'react';
import { RootProvider, SocketProvider } from '@components/Provider';
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
    <RootProvider>
      <SocketProvider>{children}</SocketProvider>
    </RootProvider>
    </body>
    </html>
  );
}
