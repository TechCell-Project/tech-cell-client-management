import { io } from 'socket.io-client';
import { URL_HOST_SOCKET_IO } from '@constants/service';
import { getAccessToken } from '@utils/local';

const socketIO = io(URL_HOST_SOCKET_IO, {
  extraHeaders: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

export default socketIO;