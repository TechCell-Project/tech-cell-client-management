"use client";

import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

export const NoSSRWrapper = ({ children }: { children: ReactNode }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
