'use client';

import { useEffect } from 'react';
import { TITLE_TECHCELL } from '@constants/data';
import dynamic from 'next/dynamic';
import { LoadingPage } from '@components/Common';

const ProductDynamic = dynamic(() => import('@components/Features').then((res) => res.Product), {
  ssr: false,
  loading: () => <LoadingPage isLoading={true} />,
});

export default function Page() {
  useEffect(() => {
    document.title = `Sản Phẩm - ${TITLE_TECHCELL}`;
  }, []);

  return <ProductDynamic />;
}
