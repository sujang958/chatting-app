var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = process.env.PORT || 5000;


app.use('/', express.static('static'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/html/index.html')
})

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/static/html/chat.html')
})

http.listen(PORT, function() {
    console.log('Socket IO server listening on port', PORT);
});


var user_count = 0;

io.on('connection', socket => {
    // 유저 구분
    var cnt = `User ${user_count++}` // 유저 카운트
    io.to(socket.id).emit('cnt', cnt);

    // 메시지 소켓
    socket.on('send', data => {
        io.emit('send_msg', data)
        console.log(data)
    })

    // 유저 카운트
    socket.on('disconnect', () => {
        user_count--
    });
});

/*

on teleport:

*/