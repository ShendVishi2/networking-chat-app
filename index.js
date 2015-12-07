//server side of the application
//modules needed
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//route of the application
app.get('', function(req, res){
    var express = require('express');
    app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, '../networking-chat-app/', 'index.html'));
});

//Register events on socket connection
io.on('connection', function(socket){
    console.log("Someone connected");
    socket.on('chatMessage', function(from, msg){
        console.log(msg);
        io.emit('chatMessage', from, msg);
    });
    socket.on('notifyUser',function(user){
        io.emit('notifyUser', user);
    });
});

//http server listen on the specified port
http.listen(3000, function(){
    console.log("Listening on port 3000");
});
