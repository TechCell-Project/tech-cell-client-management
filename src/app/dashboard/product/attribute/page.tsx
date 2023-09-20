"use client";

import { useEffect } from "react";
import { TITLE_TECHCELL } from "@constants/data";
import { Attribute } from "@components/Form";
import { NoSSRWrapper } from "@components/Shared";

export default function Page() {
  useEffect(() => {
    document.title = `Thông Số Sản Phẩm - ${TITLE_TECHCELL}`;
  }, [document.title]);

  return (
    <NoSSRWrapper>
      <Attribute />;
    </NoSSRWrapper>
  );
}
