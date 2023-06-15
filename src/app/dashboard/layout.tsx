import { Montserrat } from 'next/font/google';
import SidebarAdmin from 'components/Navigation/SidebarAdmin';
import 'styles/base/index.scss';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
    title: 'TechCell - Quản trị',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico?v=2" />
            </head>
            <body className={montserrat.className}>
                <SidebarAdmin>{children}</SidebarAdmin>
            </body>
        </html>
    );
}
