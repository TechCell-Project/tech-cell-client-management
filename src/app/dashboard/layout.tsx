'use client';

import { Montserrat } from 'next/font/google';
import SidebarAdmin from 'components/Navigation/SidebarAdmin';
import 'styles/base/index.scss';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico?v=2" />
                <title>Techcell - Quản trị</title>
            </head>
            <body
                className={montserrat.className}
                style={{ backgroundColor: '#f3f6f9' }}
            >
                <SidebarAdmin>{children}</SidebarAdmin>
            </body>
        </html>
    );
}
