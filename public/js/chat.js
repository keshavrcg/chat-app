var socket = io();  //open web socket

function scrollToBottom(){
  // Selectores
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect',function() {   //listen event on client
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if(err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  })
});

socket.on('disconnect',function() {
  console.log('Disconnected from server');
});

socket.on('updatedUserList', function(users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery("#message-form").on('submit', function(e) {
  e.preventDefault();

  var messageTestbox = jQuery('[name=message]');

  socket.emit('createMessage',{
    from: 'User',
    text: messageTestbox.val()
  }, function() {
    messageTestbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled').text('Send Location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    }, function () {
      locationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch location.');
    });
});
