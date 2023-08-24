"use client";

import { useEffect } from "react";
import { TITLE_TECHCELL } from "@constants/data";
import { Category } from "@components/Form";

export default function Page() {
  useEffect(() => {
    document.title = `Thể Loại Sản Phẩm - ${TITLE_TECHCELL}`;
  }, [document.title]);
  
  return <Category/>;
}