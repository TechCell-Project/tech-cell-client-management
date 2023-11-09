import { Manager } from 'socket.io-client';
import { URL_HOST_SOCKET_IO } from '@constants/service';
import { getAccessToken } from '@utils/local';

const manager = new Manager(URL_HOST_SOCKET_IO, {
  extraHeaders: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  autoConnect: false,
});

const socket = manager.socket('/');

export default socket;