import React, { memo, useEffect, useState } from 'react';
import { LoadingSection, NotifyIcon } from '@components/Common';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useNotification from '@hooks/useNotification';
import { getNotifications } from '@services/notificationService';
import { PagingNotify } from '@models/Notification';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { RootRoutes } from '@constants/enum';
import { formatDateViVN } from '@utils/funcs';
import { useRouter } from 'next/navigation';
import styles from '@styles/components/_noti.module.scss';

interface Props {
  status: 'all' | 'unread';
  onClose: () => void;
}

const NotificationList = memo(({ status, onClose }: Props) => {
  const { notifications, setNotifications, handleMarkAsRead } = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getNotifications({ ...new PagingNotify(), readType: status })
      .then(({ data }) => setNotifications(data.data))
      .catch(() => setNotifications([]))
      .finally(() => setIsLoading(false));
  }, [status, setNotifications]);

  return (
    <Box sx={{
      width: '100%',
      height: 'max-content',
      maxHeight: '520px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: notifications.length === 0 ? 'center' : 'flex-start',
      alignItems: notifications.length === 0 ? 'center' : 'flex-start',
    }}>
      {!isLoading ? (
        notifications?.length === 0 ? (
          <div style={{ padding: '20px' }}>
            <NotifyIcon />
            <Typography variant='body2' mt='10px' fontWeight={500}>Chưa có thông báo nào!</Typography>
          </div>
        ) : (
          notifications?.map((item) => {
            return (
              <Stack
                flexDirection='row'
                gap='15px'
                alignItems='flex-start'
                key={item._id}
                onClick={() => {
                  handleMarkAsRead(String(item._id));
                  onClose();
                  router.push(`${RootRoutes.ORDER_ROUTE}/${item.data.order._id}`);
                }}
                className={styles.notifyItem}
              >
                {/*{Boolean((item?.avatar as ImageModel)?.url) ? (*/}
                {/*  <Avatar src={String((item?.avatar as ImageModel)?.url)} alt='User Avatar'*/}
                {/*    sx={{ height: '45px', width: '45px' }} />*/}
                {/*) : (*/}
                <Avatar sx={{ height: '50px', width: '50px' }}>
                  <PersonRoundedIcon />
                </Avatar>
                {/*)}*/}
                <Stack flexDirection='column' gap='5px' alignItems='flex-start'>
                  <Typography fontSize='15px' fontWeight={!item.readAt ? 600 : 400}>{item.content}</Typography>
                  <Typography fontSize='13px' fontWeight={500}>{formatDateViVN(String(item.createdAt))}</Typography>
                </Stack>
                {!item.readAt && (
                  <FiberManualRecordIcon
                    color='secondary'
                    fontSize='small'
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      right: '-10px',
                    }}
                  />
                )}
              </Stack>
            );
          })
        )) : (
        <LoadingSection isLoading={isLoading} />
      )}
    </Box>
  );
});

export default NotificationList;