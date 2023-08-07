"use client";

import { useEffect } from "react";
import { TITLE_TECHCELL } from "@constants/data";

export default function Page({ params }: { params: { id: string } }) {
  useEffect(() => {
    document.title = `Chỉnh sửa sản Phẩm - ${TITLE_TECHCELL}`;
  }, [document.title]);
  
  return <></>
}