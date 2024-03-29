'use client';

import { useEffect } from 'react';
import { TITLE_TECHCELL } from '@constants/data';
import dynamic from 'next/dynamic';
import { LoadingPage } from '@components/Common';

const AttributeDynamic = dynamic(
  () => import('@components/Features').then((res) => res.Attribute),
  {
    ssr: false,
    loading: () => <LoadingPage isLoading={true} />,
  },
);

export default function Page() {
  useEffect(() => {
    document.title = `Thông Số Sản Phẩm - ${TITLE_TECHCELL}`;
  }, []);

  return <AttributeDynamic />;
}
