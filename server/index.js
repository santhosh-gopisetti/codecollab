const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Store socket.id → username mapping
const userMap = {};

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`🔗 User ${socket.id} joined room: ${roomId}`);
  });

  socket.on('join_user', ({ roomId, username }) => {
    userMap[socket.id] = { username, roomId };
    socket.to(roomId).emit('user_joined', username);
  });

  socket.on('send_code', ({ roomId, code }) => {
    socket.to(roomId).emit('receive_code', code);
  });

  socket.on('disconnect', () => {
    const user = userMap[socket.id];
    if (user) {
      const { username, roomId } = user;
      socket.to(roomId).emit('user_left', username);
      delete userMap[socket.id];
    }
    console.log('❌ User disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('🚀 Server running at http://localhost:4000');
});
