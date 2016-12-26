var socket = io();  //open web socket

socket.on('connect',function() {   //listen event on client
  console.log('Connected to server');

  socket.emit('createMessage', {
    to: 'prachi@example.com',
    text: 'This is a created message from client to server'
  });
});

socket.on('disconnect',function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});
