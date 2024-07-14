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

let userId = null;
let helperId = null;
const userIdToSocket = {};
const helperIdSocket = {};

io.on('connect', (socket) => {
  socket.on('register_user', (usrId, ackFn) => {
    console.log('wfh---server---regist-->', usrId);
    userIdToSocket[userId] = socket;
    userId = usrId;
    // setTimeout(() => {
    //   socket.emit('record');
    // }, 1000);
    ackFn?.();
  });
  socket.on('register_helper', (helperId, ackFn) => {
    helperIdSocket[helperId] = socket;
    helperId = helperId;
  });
  socket.on('get_user', (ackFn) => {
    ackFn?.(userId);
  });
  socket.on('record', (event, ackFn) => {
    const playerSocket = userIdToSocket[helperId];
    playerSocket.emit('record', event);
    ackFn?.(event);
  });
  socket.on('start_record', () => {
    const recordSocket = userIdToSocket[userId];
    recordSocket.emit('record');
  });
});

app.listen(6789);
