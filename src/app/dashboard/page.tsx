'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { TITLE_TECHCELL } from '@constants/data';
import { LoadingPage } from '@components/Common';

const StatisticsDynamic = dynamic(() => import('@components/Features').then((res) => res.Statistics), {
  ssr: false,
  loading: () => <LoadingPage isLoading={true} isBlur />,
});

export default function Page() {
  useEffect(() => {
    document.title = `Trang Chủ - ${TITLE_TECHCELL}`;
  }, []);

  return <StatisticsDynamic />;
}
