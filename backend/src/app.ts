import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import apiRouter from './routes/index';

const app = express();

const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: frontendURL,
  },
});

app.use(cors({
  origin: frontendURL
}));

app.use(express.json());

app.use('/api', apiRouter);

// 🔹 Eventos de conexión
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server + WS en http://localhost:${PORT}`);
});