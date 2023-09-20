'use client';

import { useEffect } from 'react';
import { TITLE_TECHCELL } from '@constants/data';
import { ProductEdit } from '@components/Form';

export default function Page({ params }: { params: { id: string } }) {
  useEffect(() => {
    document.title = `Chỉnh sửa sản phẩm - ${TITLE_TECHCELL}`;
  }, [document.title]);

  return <ProductEdit id={params.id} />;
}
