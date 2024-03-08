import { io } from 'socket.io-client';
import { URL_HOST_SOCKET_IO } from '@constants/service';

export const socketIO = (accessToken: string) => {
  const socket = io(URL_HOST_SOCKET_IO, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  socket.on('connect', () => {
    console.log('Connected to socket server! 🙃🙃🙃');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected to socket server! 😭😭😭');
  });

  return socket;
};

export const SocketEvent = {
  newOrderAdmin: 'new-order-admin',
  allUserRoom: 'all_user_room',
  userIdRoom: (userId: string) => `user_id_${userId}`,
  roleRoom: (role: string) => `${role}_room`,
  markNotifyAsRead: 'mark-notification-as-read',
};
