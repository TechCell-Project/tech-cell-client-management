'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LoadingPage } from '@components/Common';

const OrderDetailsDynamic = dynamic(
  () => import('@components/Features').then((res) => res.OrderDetails),
  {
    ssr: false,
    loading: () => <LoadingPage isLoading={true} />,
  },
);

export default function Page({ params }: { params: { id: string } }) {
  useEffect(() => {
    document.title = `Đơn hàng #${params.id}`;
  }, [document.title]);

  return <OrderDetailsDynamic id={params.id} />;
}