const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  // Assign a random user ID (color)
  const userId = Math.random().toString(36).substr(2, 9);
  socket.userId = userId;
  socket.emit('user id', userId);

  console.log('A user connected');

  socket.on('chat message', (data) => {
    // data: { text, name }
    io.emit('chat message', { text: data.text, name: data.name, userId: socket.userId });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 