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

io.on('connection', (socket) => {  //Listen for events on server (only for connection or to emit to all we use io else we use socket)
  console.log('New user connected');

  socket.emit('newMessage',{              //This will emit to only the client himself
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {     //This will emit to everyone except the broadcaster himself
    from: 'Admin',
    text: 'New User Connected',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {   //emit for emitter and on for listener so this will listen from client
    console.log('createMessage', message);
    io.emit('newMessage', {                   //This will emit to everyone
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect',()=> {
    console.log('User was disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
