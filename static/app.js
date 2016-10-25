$(document).ready(function(){
  var username = null;
  var socket = io();

  $('.login-form').submit(function(e){
    e.preventDefault();
    username = $('.username').val().trim();
    if(!username){
      return false;
    }
    $('.login-form').hide();
    $('form').show();
    $('ul').show();

    // set the user online
    socket.emit('connected-users', {'username': username});
  });

  $('.chat-form').submit(function(e){
    e.preventDefault();
    var message = $('#m').val();
    socket.emit('group-chat', {'message': message, 'username': username});
    $('#m').val('');
  });

  // listgn to messages from this channel
  socket.on('group-chat', function(message){
    message = "<b>"+message.username+": </b>"+message.message;
    $('#messages').append($('<li>').html(message));
  });


  // listgn to connected users
  socket.on('connected-users', function(message){
    $(".connected-users ul").html('');
    $.each(message, function(index, value){
      var elem = "<li> <a href='' key='"+index+"'>"+value+"</a></li>";
      $(".connected-users ul").append(elem);
    });
  });
});
