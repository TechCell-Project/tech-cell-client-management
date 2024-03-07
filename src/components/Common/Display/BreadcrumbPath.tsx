'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { PATHS } from '@constants/data';

export const BreadcrumbPath = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const breadcrumbs = [];
    for (const breadcrumb of PATHS) {
      if (pathname.startsWith(breadcrumb.pathname)) {
        breadcrumbs.push({ pathname: breadcrumb.pathname, name: breadcrumb.name });
      }
    }
    return breadcrumbs;
  };

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" sx={{ fill: '#fff' }} />}
      aria-label="breadcrumb"
    >
      <Stack direction="row" alignItems="center">
        <HouseRoundedIcon fontSize="inherit" sx={{ fill: '#fff' }} />
      </Stack>
      {generateBreadcrumbs().map((breadcrumb) => (
        <Link
          key={breadcrumb.pathname}
          href={breadcrumb.pathname}
          style={{
            pointerEvents: breadcrumb.pathname === pathname ? 'none' : 'auto',
          }}
          shallow
        >
          <Typography
            variant="body1"
            style={{
              fontSize: 14,
              fontWeight: breadcrumb.pathname === pathname ? 'bold' : '500',
              color: '#fff',
            }}
          >
            {breadcrumb.name}
          </Typography>
        </Link>
      ))}
    </Breadcrumbs>
  );
};
