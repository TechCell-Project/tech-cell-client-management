"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumbs, Typography, Stack } from "@mui/material";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const breadcrumbPaths = [
  { pathname: "/dashboard", name: "Trang chủ" },
  { pathname: "/dashboard/account", name: "Tài khoản" },
  { pathname: "/dashboard/product", name: "Sản phẩm" },
  { pathname: "/dashboard/order", name: "Đơn hàng" },
];

export const BreadcrumbPath = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const breadcrumbs = [];
    let path = "";
    for (let i = 0; i < breadcrumbPaths.length; i++) {
      const breadcrumb = breadcrumbPaths[i];
      if (pathname.startsWith(breadcrumb.pathname)) {
        path = breadcrumb.pathname;
        breadcrumbs.push({ pathname: path, name: breadcrumb.name });
      }
    }
    return breadcrumbs;
  };

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ marginBottom: "20px" }}
    >
      <Stack direction="row" alignItems="center">
        <HouseRoundedIcon fontSize="inherit" />
      </Stack>
      {generateBreadcrumbs().map((breadcrumb, index) => (
        <Link
          key={index}
          href={breadcrumb.pathname}
          style={{
            pointerEvents: breadcrumb.pathname === pathname ? "none" : "auto",
          }}
        >
          <Typography
            variant="body1"
            style={{
              fontSize: 14,
              fontWeight: breadcrumb.pathname === pathname ? "bold" : "500",
            }}
          >
            {breadcrumb.name}
          </Typography>
        </Link>
      ))}
    </Breadcrumbs>
  );
};
