"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumbs, Typography, Stack } from "@mui/material";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { PATHS } from "@constants/data";

export const BreadcrumbPath = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const breadcrumbs = [];
    let path = "";
    for (let i = 0; i < PATHS.length; i++) {
      const breadcrumb = PATHS[i];
      if (pathname.startsWith(breadcrumb.pathname)) {
        path = breadcrumb.pathname;
        breadcrumbs.push({ pathname: path, name: breadcrumb.name });
      }
    }
    return breadcrumbs;
  };

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" sx={{ fill: "#fff" }} />}
      aria-label="breadcrumb"
      // sx={{ marginBottom: "20px" }}
    >
      <Stack direction="row" alignItems="center">
        <HouseRoundedIcon fontSize="inherit" sx={{ fill: "#fff" }} />
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
              color: "#fff",
            }}
          >
            {breadcrumb.name}
          </Typography>
        </Link>
      ))}
    </Breadcrumbs>
  );
};
