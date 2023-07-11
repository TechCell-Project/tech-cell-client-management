"use client";

import { useEffect } from "react";
import { TITLE_TECHCELL } from "@constants/data";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  
  useEffect(() => {
    document.title = `Trang Chủ - ${TITLE_TECHCELL}`;
  }, [document.title, pathname]);

  return <div>Dashboard</div>;
}
