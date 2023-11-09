import React, { memo, useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import { BadgeIconButton } from '@styled-mui/badge';
import Stack from '@mui/material/Stack';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NotifyIcon } from '@components/Common';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import useNotification from '@hooks/useNotification';
import { PagingNotify } from '@models/Notification';
import { getNotifications } from '@services/notificationService';

const notifyTabs = [
  { name: 'Tất cả' },
  { name: 'Chưa đọc' },
];

export const Notification = memo(() => {
  const { notifications, setNotifications } = useNotification();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tabNotifyIndex, setTabNotifyIndex] = useState<number>(0);
  const [searchNotify, setSearchNotify] = useState<PagingNotify>(new PagingNotify());

  const open = Boolean(anchorEl);
  const id = open ? 'notify-popover' : undefined;

  useEffect(() => {
    getNotifications(searchNotify)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch(() => setNotifications(undefined));
  }, [searchNotify]);

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
          sx={{ minWidth: '380px', maxWidth: '400px' }}
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
          <Box sx={{
            width: '100%',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: '20px',
          }}>
            <NotifyIcon />
            <Typography variant='body2' mt='10px' fontWeight={500}>Chưa có thông báo nào!</Typography>
          </Box>
        </Stack>
      </Popover>
    </>
  );
});