"use client";

import React, { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  useTheme,
  Stack,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  DRAWER_WIDTH,
  LIST_NAV_MAIN,
  LIST_NAV_OTHER,
} from "@constants/navigation";
import { AppBar, DrawerHeader, Main } from "@styled-mui/appBar";
import ListNavItem from "./ListNavItem";
import Header from "./Header/Header";
import { FrameBackground } from "@components/Shared";

export default function Sidebar({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(true);
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Header open={open} handleDrawerOpen={() => setOpen(true)} />
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
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
            width={140}
            height={40}
            priority
          />
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <ListNavItem
          list={LIST_NAV_MAIN}
          pathname={pathname}
          subHeader="Danh mục"
        />
        <ListNavItem
          list={LIST_NAV_OTHER}
          pathname={pathname}
          subHeader="Khác"
        />
      </Drawer>
      <Main open={open} sx={{ padding: 0, overflow: "hidden auto" }}>
        <DrawerHeader />
        <FrameBackground />
        <Stack direction="column" position="relative" top="-45px" p="0 24px 24px 24px">
          {children}
        </Stack>
      </Main>
    </Box>
  );
}
