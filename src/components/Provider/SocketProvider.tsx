'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { NotificationModel } from '@models/Notification';
import { setPushNotifySocket, setSocket } from '@store/slices/notiSlice';
import { SocketEvent, socketIO } from '@config/socket_io.config';

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { socket } = useAppSelector((state) => state.notification);

  const handleNotifications = (data: { time: string; notifications: NotificationModel }) => {
    console.log(data);
    dispatch(setPushNotifySocket(data.notifications));
  };

  useEffect(() => {
    if (user && !socket) {
      const socketInstance = socketIO(String(user.accessToken));

      socketInstance.on(SocketEvent.newOrderAdmin, handleNotifications);
      socketInstance.on(SocketEvent.allUserRoom, handleNotifications);
      socketInstance.on(SocketEvent.userIdRoom(String(user._id)), handleNotifications);
      socketInstance.on(SocketEvent.roleRoom(String(user.role)), handleNotifications);

      dispatch(setSocket(socketInstance));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user && socket?.connected) {
      dispatch(setSocket(null));
      socket.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket?.connected, user]);

  return <>{children}</>;
};