import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: true,
});

export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};