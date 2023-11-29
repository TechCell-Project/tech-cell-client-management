import React, { memo, useMemo, useState } from 'react';
import Popover from '@mui/material/Popover';
import { BadgeIconButton } from '@styled-mui/badge';
import Stack from '@mui/material/Stack';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import NotificationList from './NotificationList';
import useNotification from '@hooks/useNotification';

export const Notification = memo(() => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tabNotifyIndex, setTabNotifyIndex] = useState<number>(0);
  const { notifications, setNotifications, handleMarkAsRead } = useNotification();

  const open = Boolean(anchorEl);
  const id = open ? 'notify-popover' : undefined;

  const notifyTabs = useMemo(() => {
    return [
      {
        name: 'Tất cả',
        component: (
          <NotificationList
            status='all'
            onClose={() => setAnchorEl(null)}
            notifications={notifications}
            setNotifications={setNotifications}
            handleMarkAsRead={handleMarkAsRead}
          />
        ),
      },
      {
        name: 'Chưa đọc',
        component: (
          <NotificationList
            status='unread'
            onClose={() => setAnchorEl(null)}
            notifications={notifications}
            setNotifications={setNotifications}
            handleMarkAsRead={handleMarkAsRead}
          />
        ),
      },
    ];
  }, [handleMarkAsRead, notifications, setNotifications]);

  return (
    <>
      <IconButton
        aria-describedby={id}
        aria-label='notification'
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
        size='large'
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <BadgeIconButton color='secondary' variant='dot'>
          <NotificationsNoneRoundedIcon />
        </BadgeIconButton>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack
          flexDirection='column'
          alignItems='flex-start'
          gap={1}
          sx={{ width: '380px' }}
          padding='12px 20px'
        >
          <Stack flexDirection='row' alignItems='center' gap={1} width='100%'>
            <Typography variant='h6' fontWeight={700}>Thông báo</Typography>
          </Stack>
          <Tabs
            value={tabNotifyIndex}
            onChange={(_: React.SyntheticEvent, index: number) => setTabNotifyIndex(index)}
            aria-label='tabs'
            sx={{
              '& .MuiTabs-indicator': {
                display: 'none',
              },
              '& .MuiTabs-flexContainer': {
                gap: '15px',
              },
              mt: 1,
            }}
          >
            {notifyTabs.map((tab, index) => (
              <Tab
                key={tab.name}
                label={tab.name}
                onClick={() => setTabNotifyIndex(index)}
                sx={{
                  textTransform: 'unset',
                  transition: 'all linear 0.3s',
                  minHeight: '25px',
                  '&.Mui-selected': {
                    fontWeight: 600,
                    bgcolor: theme.color.red,
                    color: '#fff',
                    borderRadius: '100px',
                  },
                }}
              />
            ))}
          </Tabs>
          {notifyTabs[tabNotifyIndex].component}
        </Stack>
      </Popover>
    </>
  );
});