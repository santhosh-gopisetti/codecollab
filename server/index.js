const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Allow CORS for frontend (Netlify or others)
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: '*', // In production, set to your Netlify frontend URL
    methods: ['GET', 'POST'],
  },
});

// Map socket.id → { username, roomId }
const userMap = {};

io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`🔗 User ${socket.id} joined room: ${roomId}`);
  });

  socket.on('join_user', ({ roomId, username }) => {
    userMap[socket.id] = { username, roomId };
    socket.to(roomId).emit('user_joined', username);
    console.log(`👤 ${username} joined room: ${roomId}`);
  });

  socket.on('send_code', ({ roomId, code }) => {
    socket.to(roomId).emit('receive_code', code);
  });

  socket.on('disconnect', () => {
    const user = userMap[socket.id];
    if (user) {
      const { username, roomId } = user;
      socket.to(roomId).emit('user_left', username);
      console.log(`🚪 ${username} left room: ${roomId}`);
      delete userMap[socket.id];
    } else {
      console.log(`❌ Disconnected: ${socket.id}`);
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
