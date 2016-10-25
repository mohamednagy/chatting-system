var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('static')); // serve static files from static folder

app.get('/', function(req, res){
  res.sendFile(__dirname+'/views/index.html');
});

var connectedUsers = {};
io.on('connection', function (socket) {

  console.log("client connected");

  socket.on('group-chat', function(message){
    io.emit('group-chat', message);
  });

  socket.on('connected-users', function(message){
    if(connectedUsers[socket.id] == null){
        connectedUsers[socket.id] = message.username;
        io.emit('connected-users', connectedUsers);
    }
  });

  socket.on('disconnect', function(){
    delete connectedUsers[socket.id];
    io.emit('connected-users', connectedUsers);
  });

});



server.listen(3000);
