"use client";

import { useEffect } from "react";
import { TITLE_TECHCELL } from "@constants/data";
import { Order } from "@components/Form";
import { NoSSRWrapper } from "@components/Shared";

export default function Page() {
  useEffect(() => {
    document.title = `Đơn Hàng - ${TITLE_TECHCELL}`;
  }, [document.title]);

  return (
    <NoSSRWrapper>
      <Order />
    </NoSSRWrapper>
  );
}
