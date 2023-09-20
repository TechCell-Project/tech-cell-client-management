"use client";

import { Account } from "@components/Form";
import { TITLE_TECHCELL } from "@constants/data";
import { useEffect } from "react";
import { NoSSRWrapper } from "@components/Shared";

export default function Page() {
  useEffect(() => {
    document.title = `Tài Khoản - ${TITLE_TECHCELL}`;
  }, [document.title]);

  return (
    <NoSSRWrapper>
      <Account />
    </NoSSRWrapper>
  );
}
