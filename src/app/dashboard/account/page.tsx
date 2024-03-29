'use client';

import { TITLE_TECHCELL } from '@constants/data';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { LoadingPage } from '@components/Common';

const AccountDynamic = dynamic(() => import('@components/Features').then((res) => res.Account), {
  ssr: false,
  loading: () => <LoadingPage isLoading={true} />,
});

export default function Page() {
  useEffect(() => {
    document.title = `Tài Khoản - ${TITLE_TECHCELL}`;
  }, []);

  return <AccountDynamic />;
}
