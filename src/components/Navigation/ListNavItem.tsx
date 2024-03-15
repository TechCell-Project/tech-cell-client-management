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
import { useTheme } from '@mui/material/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAppDispatch } from '@store/store';
import { logout } from '@store/slices/authSlice';
import { ChangePassword, Profile } from '@components/Features';

interface Props {
  list?: any;
  pathname?: string;
  subHeader?: string;
}

const NavWithAction = ({
  item,
  handleClick,
}: {
  item: any;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const theme = useTheme();

  return (
    <ListItemButton sx={{ borderRadius: '10px' }} onClick={handleClick}>
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <item.icon />
      </ListItemIcon>
      <ListItemText primary={item.name} color={theme.color.black} />
    </ListItemButton>
  );
};

const ListNavItem: FC<Props> = ({ list, pathname, subHeader }) => {
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const [openChangePass, setOpenChangePass] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  const theme = useTheme();
  const dispatch = useAppDispatch();

  const renderLinkNav = () => {
    return list?.map((nav: any, i: number) => {
      const renderItem = () => {
        if (nav && !nav.isCollapse && !nav.isLogout && !nav.isChangePass && !nav.isProfile) {
          return (
            <Link href={`${nav.to}`} style={{ width: '100%' }} shallow>
              <ListItemButton selected={pathname === String(nav.to)} sx={{ borderRadius: '10px' }}>
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <nav.icon />
                </ListItemIcon>
                <ListItemText primary={nav.name} color={theme.color.black} />
              </ListItemButton>
            </Link>
          );
        } else if (nav && nav.isLogout) {
          return <NavWithAction item={nav} handleClick={() => dispatch(logout())} />;
        } else if (nav && nav.isChangePass) {
          return <NavWithAction item={nav} handleClick={() => setOpenChangePass(true)} />;
        } else if (nav && nav.isProfile) {
          return <NavWithAction item={nav} handleClick={() => setOpenProfile(true)} />;
        } else if (nav && nav.isCollapse) {
          return (
            <>
              <ListItemButton
                onClick={() => setOpenCollapse(!openCollapse)}
                sx={{ width: '100%', mt: openCollapse ? '10px' : 0 }}
                selected={openCollapse}
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>{<nav.icon />}</ListItemIcon>
                <ListItemText primary={nav.name} />
                {openCollapse ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openCollapse}
                timeout="auto"
                unmountOnExit
                sx={{ transition: 'all ease-in 0.3s', m: '10px 0' }}
              >
                {nav.listChildren.map((child: any) => (
                  <Link href={`${child.to}`} style={{ width: '100%' }} key={child.to} shallow>
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
            flexDirection: nav?.listChildren ? 'column' : 'row',
            transition: 'all linear 0.3s',
          }}
        >
          {renderItem()}
        </ListItem>
      );
    });
  };

  return (
    <>
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
            {subHeader ?? ''}
          </ListSubheader>
        }
      >
        {renderLinkNav()}
      </List>

      {openChangePass && (
        <ChangePassword isOpen={openChangePass} handleClose={() => setOpenChangePass(false)} />
      )}

      {openProfile && <Profile isOpen={openProfile} handleClose={() => setOpenProfile(false)} />}
    </>
  );
};

export default ListNavItem;
