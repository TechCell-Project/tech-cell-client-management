'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { Montserrat } from 'next/font/google';
import Sidebar from '@components/Navigation/Sidebar';
import { LoadingPage } from '@components/Common';
import { store, useAppSelector } from '@store/store';
import 'styles/base/index.scss';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            const timeout = setTimeout(() => {
                router.push('/');
            }, 1000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isAuthenticated]);

    return !isAuthenticated ? (
        <LoadingPage isLoading={true} />
    ) : (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico?v=2" />
                <title>Trang Quản Trị TechCell - Trang Chủ</title>
            </head>
            <body className={montserrat.className} style={{ backgroundColor: '#f3f6f9' }}>
                <Provider store={store}>
                    <Sidebar>{children}</Sidebar>
                </Provider>
            </body>
        </html>
    );
}
