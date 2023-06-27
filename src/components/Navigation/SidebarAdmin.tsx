'use client';

import React, { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    Stack,
    Toolbar,
    Badge,
    BadgeProps,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { LIST_NAV_MAIN, LIST_NAV_OTHER } from 'constants/navigation';
import SearchHeader from './SearchHeader';
import UserBoxHeader from './UserBoxHeader';
import ListNavItem from './ListNavItem';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        backgroundColor: 'transparent',
        color: theme.color.black,
        boxShadow: 'unset',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    '& .MuiBadge-badge': {
        right: -1,
        top: -2,
    },
}));

export default function SidebarAdmin({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(true);
    const pathname = usePathname();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={3}
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                        <UserBoxHeader role="Admin" name="Admin Name" />
                    </Stack>
                    <Box sx={{ ...(!open && { display: 'none' }) }}>
                        <UserBoxHeader role="Admin" name="Admin Name" />
                    </Box>
                    <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={2}>
                        <SearchHeader />
                        <Stack direction="row" alignItems="center" gap={1}>
                            <IconButton
                                aria-label="notifications"
                                sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                            >
                                <StyledBadge color="secondary" variant="dot">
                                    <NotificationsNoneRoundedIcon />
                                </StyledBadge>
                            </IconButton>
                            <IconButton
                                aria-label="chat"
                                sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                            >
                                <StyledBadge color="secondary" variant="dot">
                                    <ForumRoundedIcon />
                                </StyledBadge>
                            </IconButton>
                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ p: 0, mb: 2 }}>
                    <Image src="/logo-red.png" alt="Logo Techcell" width={140} height={40} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <ListNavItem list={LIST_NAV_MAIN} pathname={pathname} subHeader="Danh mục" />
                <ListNavItem list={LIST_NAV_OTHER} pathname={pathname} subHeader="Khác" />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}
