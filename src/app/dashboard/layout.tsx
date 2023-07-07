'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@components/Navigation/Sidebar';
import { LoadingPage } from '@components/Common';
import { useAppSelector } from '@store/store';

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

    return (
        <section style={{ backgroundColor: '#f3f6f9' }}>
            {!isAuthenticated ? <LoadingPage isLoading={true} /> : <Sidebar>{children}</Sidebar>}
        </section>
    );
}
