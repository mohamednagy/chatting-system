$(document).ready(function(){
  var socket = io();

  $('form').submit(function(e){
    e.preventDefault();
    var message = $('#m').val();
    socket.emit('group-chat', message);
    $('#m').val('');
  });

  // listgn to messages from this channel
  socket.on('group-chat', function(message){
    $('#messages').append($('<li>').text(message));
  });
});
