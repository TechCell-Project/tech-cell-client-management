'use client';

import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@components/Navigation/Sidebar';
import { LoadingPage } from '@components/Common';
import { useAppSelector } from '@store/store';
import Loading from 'app/loading';

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
      {!isAuthenticated ? (
        <LoadingPage isLoading={true} />
      ) : (
        <Suspense fallback={<Loading />}>
          <Sidebar>{children}</Sidebar>
        </Suspense>
      )}
    </section>
  );
}
