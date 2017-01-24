/*
First you require the Socket.IO module. Then you wrap the Express app in a Node http.Server object. This allows Socket.IO to run alongside Express. You then initialize an io object, by passing the server to into the socket_io function. This creates a Socket.IO Server, which is an EventEmitter. Next you add a listener to the connection event of the server. This will be called whenever a new client connects to the Socket.IO server. Finally notice that you now call server.listen rather than app.listen.
*/

// connect to the Socket.IO server
var socket_io = require('socket.io');

var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

/*
Here you add a new listener to the socket which is used to communicate with the client. When a message with the name message is received on the socket you simply print out the message.
*/

var userConnected = 0;
io.on('connection', function (socket) {
  
  console.log('Client connected');
  userConnected++
  console.log('connections: ' + userConnected)

// -------------------------------------------------------
// Broadcast and display a message to connected users when someone connects or disconnects
  socket.on('disconnect', function () {
    console.log('user disconnected');
    userConnected--
    socket.broadcast.emit('user disconnected');
    console.log('connections: ' + userConnected)
// --------------------------------------------------------
    });
    socket.on('message', function (message) {
      console.log('Received message:', message);

      /* broadcast the message to any other clients who are connected. 
      
      There are three ways to communicate from the server to clients. To send a message to a single client you can use the socket.emit method (where socket is the object passed into your connection listener. To send a message to all connected clients you can use the io.emit method. And to send a message to all clients except one, you can use the socket.broadcast.emit method, which won't send the message to the client whose socket object you are using.

Here you call the socket.broadcast.emit function, to broadcast the message that you received from a client to all of the other clients.
      
      */
      socket.broadcast.emit('message', message);
  });
});

server.listen(process.env.PORT || 8080);