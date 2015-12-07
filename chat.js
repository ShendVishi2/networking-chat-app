//initialize socket io
var socket = io();

function submitfunction(){
    var from = $('#user').val();
    var message = $('#message').val();
    if(message != ''){
        socket.emit('chatMessage', from, message);
    }

    $('#message').val('').focus();
    return false;
}

function notifyTyping(){
    var use = $('#user').val();
    socket.emit('notifyUser', user);
}

socket.on('chatMessage', function(from, msg){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

socket.on('notifyUser', function(user){
    var m = $('#user').val();

    if(user != m){
        $('#notifyUser').text(user + ' is typing ...');
    }
});

$(document).ready(function(){
    var name = makeId();
    $('#user').val(name);
    socket.emit('chatMessage', 'System', '<b>' + name + 'has joined chat')
});
//adds a character to the name of the user
//probably unneccesary
function makeId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i=0; i<5; i++){
        text += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return text;
}
