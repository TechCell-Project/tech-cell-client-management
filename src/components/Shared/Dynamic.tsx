'use client';

import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { LoadingPage } from '@components/Common';

export const NoSSRWrapper = ({ children }: { children: ReactNode }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});

export const DataTableDynamic = dynamic(
  () => import('@components/Common').then((res) => res.DataTable),
  {
    ssr: false,
    loading: () => <LoadingPage isLoading={true} isBlur />,
  },
);
