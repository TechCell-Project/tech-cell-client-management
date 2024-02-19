'use client';

import React, { ReactNode, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DRAWER_WIDTH, LIST_NAV_MAIN, LIST_NAV_OTHER } from '@constants/navigation';
import { AppBar, DrawerHeader, Main } from '@styled-mui/appBar';
import ListNavItem from './ListNavItem';
import Header from './Header/Header';
import { FrameBackground } from '@components/Shared';
import { RootRoutes } from '@constants/enum';

export default function Sidebar({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(true);
  const theme = useTheme();
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Header open={open} handleDrawerOpen={() => setOpen(true)} />
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ p: 0, mb: 2 }}>
          <Image
            src="/logo-red.png"
            alt="Logo Techcell"
            height={40}
            priority
            style={{
              cursor: 'pointer',
            }}
            onClick={() => push(RootRoutes.DASHBOARD_ROUTE)}
          />
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <ListNavItem list={LIST_NAV_MAIN} pathname={pathname} subHeader="Danh mục" />
        <ListNavItem list={LIST_NAV_OTHER} pathname={pathname} subHeader="Khác" />
      </Drawer>
      <Main open={open} sx={{ padding: 0, pb: '15px', overflow: 'hidden auto' }}>
        <DrawerHeader />
        <FrameBackground />
        <Stack direction="column" position="relative" top="-45px" p="0 30px 24px 30px">
          {children}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            position="absolute"
            bottom="-30px"
            right="30px"
            left="30px"
          >
            <p style={{ fontSize: '15px' }}>
              © 2023, made with ❤️ by <b style={{ fontWeight: 600 }}>Techcell Team</b>
            </p>
            <Stack direction="row" gap={3}>
              <a
                style={{ fontSize: '15px', fontWeight: 600 }}
                target="_blank"
                href="https://techcell.cloud/"
              >
                Website
              </a>
              <a
                style={{ fontSize: '15px', fontWeight: 600 }}
                target="_blank"
                href="https://docs.techcell.cloud/"
              >
                Document
              </a>
              <a style={{ fontSize: '15px', fontWeight: 600 }} href="mailto:teams@techcell.cloud">
                Contact
              </a>
            </Stack>
          </Stack>
        </Stack>
      </Main>
    </Box>
  );
}
