import React, { memo, FC } from 'react';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import UserBoxHeader from './UserBoxHeader';
import SearchHeader from './SearchHeader';
import { useAppSelector } from '@store/store';
import { getRole } from '@utils/index';
import { Notification } from '@components/Features';

interface IHeader {
  open?: boolean;
  handleDrawerOpen?: () => void;
}

const Header: FC<IHeader> = ({ open, handleDrawerOpen }) => {
  const { user } = useAppSelector((state) => state.auth);

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
        <UserBoxHeader role={getRole(user?.role)} name={`${user?.firstName} ${user?.lastName}`} />
      </Stack>
      <Box sx={{ ...(!open && { display: 'none' }) }}>
        <UserBoxHeader role={getRole(user?.role)} name={`${user?.firstName} ${user?.lastName}`} />
      </Box>
      <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={2}>
        <SearchHeader />
        <Notification />
      </Stack>
    </Toolbar>
  );
};

export default memo(Header);
