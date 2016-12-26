var socket = io();  //open web socket

socket.on('connect',function() {   //listen event on client
  console.log('Connected to server');
});

socket.on('disconnect',function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});
