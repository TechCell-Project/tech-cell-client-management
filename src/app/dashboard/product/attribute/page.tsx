'use client';

import { useEffect } from 'react';
import { TITLE_TECHCELL } from '@constants/data';
import dynamic from 'next/dynamic';
import { LoadingPage } from '@components/Common';

const AttributeDynamic = dynamic(() => import('@components/Form').then((res) => res.Attribute), {
  ssr: false,
  loading: () => <LoadingPage isLoading={true} isBlur />,
});

export default function Page() {
  useEffect(() => {
    document.title = `Thông Số Sản Phẩm - ${TITLE_TECHCELL}`;
  }, []);

  return <AttributeDynamic />;
}
