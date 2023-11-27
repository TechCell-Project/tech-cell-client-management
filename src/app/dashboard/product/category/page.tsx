'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { TITLE_TECHCELL } from '@constants/data';
import { LoadingPage } from '@components/Common';

const CategoryDynamic = dynamic(() => import('@components/Features').then((res) => res.Category), {
  ssr: false,
  loading: () => <LoadingPage isLoading={true} />,
});

export default function Page() {
  useEffect(() => {
    document.title = `Thể Loại Sản Phẩm - ${TITLE_TECHCELL}`;
  }, []);

  return <CategoryDynamic />;
}
