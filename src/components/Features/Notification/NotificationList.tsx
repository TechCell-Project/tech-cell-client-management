import React, { memo, useEffect, useState } from 'react';
import { ButtonCustom, LoadingSection, NotifyIcon } from '@components/Common';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PagingNotify } from '@models/Notification';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { RootRoutes } from '@constants/enum';
import { useRouter } from 'next/navigation';
import styles from '@styles/components/_noti.module.scss';
import momentVi from '@config/moment.config';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllNotification, resetNotification } from '@store/slices/notiSlice';
import { SocketEvent } from '@config/socket_io.config';

const NotificationList = memo(
  ({ status, onClose }: { status: 'all' | 'unread'; onClose: () => void }) => {
    const dispatch = useAppDispatch();
    const { notifications, isLoading, showReadmore, socket } = useAppSelector(
      (state) => state.notification,
    );
    const [paging, setPaging] = useState<PagingNotify>(new PagingNotify());
    const router = useRouter();

    useEffect(() => {
      dispatch(
        getAllNotification(
          {
            ...new PagingNotify(),
            readType: status,
          },
          'get',
        ),
      ).then();

      setPaging(new PagingNotify());

      return () => {
        dispatch(resetNotification());
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, dispatch]);

    const handleMarkAsRead = (notificationId: string) => {
      if (socket) {
        console.log(`Read order #${notificationId}!`);
        socket.emit(SocketEvent.markNotifyAsRead, { notificationId });
      }
    };

    const renderNotificationItem = () => {
      return notifications?.length === 0 ? (
        <div style={{ padding: '20px' }}>
          <NotifyIcon />
          <Typography variant="body2" mt="10px" fontWeight={500}>
            Chưa có thông báo nào!
          </Typography>
        </div>
      ) : (
        <>
          {notifications?.map((item) => {
            return (
              <Stack
                flexDirection="row"
                gap="15px"
                alignItems="flex-start"
                key={item._id}
                onClick={() => {
                  handleMarkAsRead(String(item._id));
                  onClose();
                  router.push(`${RootRoutes.ORDER_ROUTE}/${item.data.order._id}`);
                }}
                className={styles.notifyItem}
              >
                <Avatar sx={{ height: '50px', width: '50px' }}>
                  <PersonRoundedIcon />
                </Avatar>
                <Stack flexDirection="column" gap="5px" alignItems="flex-start">
                  <Typography fontSize="15px" fontWeight={!item.readAt ? 600 : 400}>
                    {item.content}
                  </Typography>
                  <Typography fontSize="13px" fontWeight={500}>
                    {momentVi(String(item.createdAt)).fromNow()}
                  </Typography>
                </Stack>
                {!item.readAt && (
                  <FiberManualRecordIcon
                    color="secondary"
                    fontSize="small"
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
          })}
          {showReadmore && (
            <ButtonCustom
              variant="text"
              content="Xem thêm"
              handleClick={() => {
                setPaging((prev) => ({ ...prev, page: prev.page + 1 }));
                dispatch(
                  getAllNotification(
                    {
                      ...paging,
                      page: paging.page + 1,
                      readType: status,
                    },
                    'paging',
                  ),
                ).then();
              }}
              styles={{
                width: '100%',
                lineHeight: '40px',
              }}
              startIcon={<ExpandMoreRoundedIcon />}
            />
          )}
        </>
      );
    };

    return (
      <Box
        sx={{
          width: '100%',
          height: 'max-content',
          maxHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: notifications.length === 0 ? 'center' : 'flex-start',
          alignItems: notifications.length === 0 ? 'center' : 'flex-start',
        }}
      >
        {!isLoading ? <>{renderNotificationItem()}</> : <LoadingSection isLoading={isLoading} />}
      </Box>
    );
  },
);

export default NotificationList;
