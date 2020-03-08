var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send({ response: 'I am alive' }).status(200);
});

let clients = 0;
io.on('connection', function(socket) {
  clients++;
  io.emit('user-joined', clients);
  socket.on('message', function(msg) {
    socket.broadcast.emit('message', {
      content: msg.content,
      username: msg.username
    });
  });
  socket.on('disconnect', function() {
    clients--;
    io.emit('user-joined', clients);
  });
});

http.listen(4000, function() {
  console.log('listening on *:4000');
});

Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
