'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@components/Navigation/Sidebar';
import { LoadingPage } from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import Loading from 'app/loading';
import { RootRoutes } from '@constants/enum';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      const timeout = setTimeout(() => {
        router.push(RootRoutes.LOGIN_ROUTES);
      }, 300);
      return () => {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAuthenticated]);

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
