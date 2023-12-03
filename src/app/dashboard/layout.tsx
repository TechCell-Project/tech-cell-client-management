'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@components/Navigation/Sidebar';
import { LoadingPage } from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import Loading from 'app/loading';
import socket from '@config/socket_io.config';
import { getAllNotification, setPushNotifySocket, setSocket } from '@store/slices/notiSlice';
import { PagingNotify } from '@models/Notification';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      const timeout = setTimeout(() => {
        router.push('/');
      }, 300);
      return () => {
        clearTimeout(timeout);
      };
    }

    socket.on('connect', () => {
      console.log('Connected To socket Server! 🙃🙃🙃');
    });

    socket.on('new-order-admin', (data) => {
      console.log(data);
      dispatch(setPushNotifySocket(data.notifications));
    });

    dispatch(setSocket(socket));
    dispatch(getAllNotification(new PagingNotify(), 'get')).then();

    return () => {
      console.log('Disconnected socket Server! 🙃');
      socket.disconnect();
    };
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
