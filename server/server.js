const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app); //Instead of app we now using server (express also uses same behind the scene)
var io = socketIO(server);  //listen events through io

app.use(express.static(publicPath));

io.on('connection', (socket) => {  //Listen for events on server (only for connection we use io else we'll use socket)
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'keshav@example.com',
    text: 'This is a new message from server to client',
    createAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect',()=> {
    console.log('User was disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
