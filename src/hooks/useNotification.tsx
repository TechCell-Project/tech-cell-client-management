import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import socketIO from '@config/socket_io.config';
import { NotificationModel } from '@models/Notification';
import { useAppSelector } from '@store/store';

const useNotification = () => {
  const [notifications, setNotifications] = useState<Array<NotificationModel>>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleMarkAsRead = (notificationId: string) => {
    if (notificationId && socket) {
      console.log(`Read order #${notificationId}!`);
      socket.emit('mark-notification-as-read', { notificationId });
    }
  };

  useEffect(() => {
    const ws = socketIO;

    ws.on('connect', () => {
      console.log('Connected To SocketIO Server! 🙃🙃🙃');
    });

    ws.on('new-order-admin', (data) => {
      console.log(data);
      setNotifications((prev) => {
        return [data.notifications].concat([...prev]);
      });
    });

    setSocket(ws);

    return () => {
      console.log('Disconnected SocketIO Server! 🙃');
      ws.disconnect();
    };
  }, []);

  return { notifications, setNotifications, handleMarkAsRead };
};

export default useNotification;