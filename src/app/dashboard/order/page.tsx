'use client';

import { useEffect } from 'react';
import { TITLE_TECHCELL } from '@constants/data';
import dynamic from 'next/dynamic';
import { LoadingPage } from '@components/Common';

const OrderDynamic = dynamic(() => import('@components/Features').then((res) => res.Order), {
  ssr: false,
  loading: () => <LoadingPage isLoading={true} />,
});

export default function Page() {
  useEffect(() => {
    document.title = `Đơn Hàng - ${TITLE_TECHCELL}`;
  }, []);

  return <OrderDynamic />;
}
