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

  const dispatchNotification = (data: { time: string; notifications: NotificationModel }) => {
    console.log(data);
    dispatch(setPushNotifySocket(data.notifications));
  };

  useEffect(() => {
    if (user && !socket) {
      const socket = socketIO(String(user.accessToken));

      socket.on(SocketEvent.newOrderAdmin, dispatchNotification);
      socket.on(SocketEvent.allUserRoom, dispatchNotification);
      socket.on(SocketEvent.userIdRoom(String(user._id)), dispatchNotification);
      socket.on(SocketEvent.roleRoom(String(user.role)), dispatchNotification);

      dispatch(setSocket(socket));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if(!user && socket?.connected) {
      dispatch(setSocket(null));
      socket.disconnect();
    }
  }, [dispatch, socket, user]);

  return <>{children}</>;
};