'use client';

import React, { FC, useState } from 'react';
import Link from 'next/link';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useTheme } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { IListNavProps } from '@interface/navigation';
import { useAppDispatch } from '@store/store';
import { logout } from '@store/slices/authSlice';

const ListNavItem: FC<IListNavProps> = ({ list, pathname, subHeader }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);

  const renderLinkNav = () => {
    return list?.map((nav: any, i: number) => {
      const renderItem = () => {
        if (!nav.isCollapse && !nav.isLogout) {
          return (
            <Link href={nav.to} style={{ width: '100%' }} shallow>
              <ListItemButton selected={pathname === String(nav.to)} sx={{ borderRadius: '10px' }}>
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <nav.icon />
                </ListItemIcon>
                <ListItemText primary={nav.name} color={theme.color.black} />
              </ListItemButton>
            </Link>
          );
        } else if (nav.isLogout) {
          return (
            <ListItemButton
              sx={{ borderRadius: '10px' }}
              onClick={async () => await dispatch(logout())}
            >
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <nav.icon />
              </ListItemIcon>
              <ListItemText primary={nav.name} color={theme.color.black} />
            </ListItemButton>
          );
        } else if (nav.isCollapse) {
          return (
            <>
              <ListItemButton
                onClick={() => setOpenCollapse(!openCollapse)}
                sx={{ width: '100%' }}
                selected={openCollapse}
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>{<nav.icon />}</ListItemIcon>
                <ListItemText primary={nav.name} />
                {openCollapse ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCollapse} timeout="auto" unmountOnExit sx={{ mt: '10px' }}>
                {nav.listChildren.map((child: any, i: number) => (
                  <Link href={child.to} style={{ width: '100%' }} key={i} shallow>
                    <ListItemButton
                      selected={pathname === String(child.to)}
                      sx={{ borderRadius: '10px', pl: '5px' }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: '40px',
                          '& .MuiSvgIcon-root': { fontSize: '1.2rem' },
                        }}
                      >
                        <child.icon />
                      </ListItemIcon>
                      <ListItemText primary={child.name} color={theme.color.black} />
                    </ListItemButton>
                  </Link>
                ))}
              </Collapse>
            </>
          );
        }
      };

      return (
        <ListItem
          disablePadding
          key={i}
          sx={{
            flexDirection: nav.listChildren ? 'column' : 'row',
            mb: openCollapse ? '10px' : 0,
            transition: 'all linear 0.3s',
          }}
        >
          {renderItem()}
        </ListItem>
      );
    });
  };

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
      {renderLinkNav()}
    </List>
  );
};

export default ListNavItem;
