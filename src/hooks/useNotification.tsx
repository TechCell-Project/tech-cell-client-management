import { useEffect, useState } from 'react';
import socket from '@config/socket_io.config';

const useNotification = () => {
  const [notifications, setNotifications] = useState();

  const handleMarkAsRead = (notificationId: string) => {
    if (notificationId) {
      socket.emit('mark-notification-as-read', { notificationId });
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket io server!');
    });

    socket.on('new-order-admin', (data) => {
      setNotifications(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { notifications, setNotifications, handleMarkAsRead };
};

export default useNotification;