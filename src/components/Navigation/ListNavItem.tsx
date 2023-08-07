import React, { FC } from 'react';
import Link from 'next/link';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useTheme,
} from '@mui/material';
import { IListNavProps } from '@interface/navigation';
import { useAppDispatch } from '@store/store';
import { logout } from '@store/slices/authSlice';

const ListNavItem: FC<IListNavProps> = ({ list, pathname, subHeader }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  return (
    <List
      subheader={
        <ListSubheader
          sx={{
            fontSize: '12px',
            fontWeight: 700,
            px: '10px',
            lineHeight: '40px',
            color: 'rgba(0, 0, 0, 0.8)',
            textTransform: 'uppercase',
          }}
          component="div"
        >
          {subHeader ? subHeader : ''}
        </ListSubheader>
      }
    >
      {list?.map((nav, i) => (
        <ListItem disablePadding key={i}>
          {nav.to ? (
            <Link href={nav.to} style={{ width: '100%' }}>
              <ListItemButton
                selected={pathname === nav.to}
                sx={{ borderRadius: '10px' }}
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  {<nav.icon />}
                </ListItemIcon>
                <ListItemText primary={nav.name} color={theme.color.black} />
              </ListItemButton>
            </Link>
          ) : (
            <ListItemButton
              sx={{ borderRadius: '10px' }}
              onClick={async () => await dispatch(logout())}
            >
              <ListItemIcon sx={{ minWidth: '40px' }}>{<nav.icon />}</ListItemIcon>
              <ListItemText primary={nav.name} color={theme.color.black} />
            </ListItemButton>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default ListNavItem;
