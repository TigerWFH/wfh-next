// import { createServer } from 'http';
// import { Server } from 'socket.io';
const createServer = require('http').createServer;
const Server = require('socket.io').Server;

const app = createServer();
const io = new Server(app, {
  cors: {
    origin: '*'
    // allowedHeaders: ['my-custom-header'],
    // credentials: true
  }
});

const userId = null;

io.on('connect', (socket) => {
  console.log('wfh----server---connect');
  socket.on('register_user', (userId, ackFn) => {
    console.log('wfh--server---register_user');
    userId = userId;
    setTimeout(() => {
      socket.emit('record');
    }, 1000);
    ackFn?.();
  });
  socket.on('record', (event, ackFn) => {
    console.log('wfh----server---record', event);
    ackFn?.(ackFn);
  });
});

app.listen(6789);
