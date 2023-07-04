import React, { memo, FC } from 'react';
import { IconButton, Toolbar, Stack, Box } from '@mui/material';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { BadgeIconButton } from '@styled-mui/badge';
import UserBoxHeader from './UserBoxHeader';
import SearchHeader from './SearchHeader';

interface IHeader {
    open?: boolean;
    handleDrawerOpen?: () => void;
}

const Header: FC<IHeader> = ({ open, handleDrawerOpen }) => {
    return (
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
                        size="large"
                    >
                        <BadgeIconButton color="secondary" variant="dot">
                            <NotificationsNoneRoundedIcon />
                        </BadgeIconButton>
                    </IconButton>
                    <IconButton
                        aria-label="chat"
                        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                        size="large"
                    >
                        <BadgeIconButton color="secondary" variant="dot">
                            <ForumRoundedIcon />
                        </BadgeIconButton>
                    </IconButton>
                </Stack>
            </Stack>
        </Toolbar>
    );
};

export default memo(Header);
