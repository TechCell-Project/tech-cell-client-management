'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { TITLE_TECHCELL } from '@constants/data';
import { LoadingPage } from '@components/Common';

const ProductCreateDynamic = dynamic(
  () => import('@components/Features').then((res) => res.ProductCreate),
  {
    ssr: false,
    loading: () => <LoadingPage isLoading={true} isBlur />,
  },
);

export default function Page() {
  useEffect(() => {
    document.title = `Tạo mới sản Phẩm - ${TITLE_TECHCELL}`;
  }, []);

  return <ProductCreateDynamic />;
}
