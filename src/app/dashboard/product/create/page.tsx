"use client";

import { useEffect } from "react";
import { TITLE_TECHCELL } from "@constants/data";
import { ProductCreate } from "@components/Form";

export default function Page() {
  useEffect(() => {
    document.title = `Tạo mới sản Phẩm - ${TITLE_TECHCELL}`;
  }, [document.title]);
  
  return <ProductCreate />;
}