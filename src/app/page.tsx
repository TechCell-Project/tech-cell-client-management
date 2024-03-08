'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { authenticate } from '@store/slices/authSlice';
import { LoadingPage } from '@components/Common';
import { TITLE_TECHCELL } from '@constants/data';
import { RootRoutes } from '@constants/enum';
import dynamic from 'next/dynamic';

const LoginDynamic = dynamic(() => import('@components/Features').then((res) => res.Login), {
  ssr: false,
  loading: () => <LoadingPage isLoading={true} />,
});

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticate()).then();
  }, [dispatch]);

  useEffect(() => {
    document.title = `Đăng Nhập - ${TITLE_TECHCELL}`;
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        router.push(RootRoutes.DASHBOARD_ROUTE);
      }, 300);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <LoadingPage isLoading={true} /> : <LoginDynamic />;
}
