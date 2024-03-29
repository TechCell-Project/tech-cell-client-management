'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { TITLE_TECHCELL } from '@constants/data';
import { LoadingPage } from '@components/Common';

const ProductEditDynamic = dynamic(
  () => import('@components/Features').then((res) => res.ProductEdit),
  {
    ssr: false,
    loading: () => <LoadingPage isLoading={true} />,
  },
);

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  useEffect(() => {
    document.title = `Chỉnh sửa sản phẩm - ${TITLE_TECHCELL}`;
  }, [document.title]);

  return <ProductEditDynamic id={params.id} />;
}
