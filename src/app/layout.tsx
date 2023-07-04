'use client';

import { ThemeProvider } from '@mui/material';
import { store } from '@store/store';
import { theme } from 'components/Theme/theme';
import { Montserrat } from 'next/font/google';
import { Provider } from 'react-redux';
import 'styles/base/index.scss';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Trang Quản Trị TechCell - Đăng nhập</title>
                <link rel="icon" href="/favicon.ico?v=2" />
            </head>
            <body className={montserrat.className}>
                <ThemeProvider theme={theme}>
                    <Provider store={store}>{children}</Provider>
                </ThemeProvider>
            </body>
        </html>
    );
}
