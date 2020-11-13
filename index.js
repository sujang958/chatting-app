var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html')
})

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/html/chat.html')
})

app.get('/css/chat.css', (req, res) => {
    res.sendFile(__dirname + '/css/chat.css')
})

app.get('/js/chat.js', (req, res) => {
    res.sendFile(__dirname + '/js/chat.js')
})

app.get('/css/index.css', (req, res) => {
    res.sendFile(__dirname + '/css/index.css')
})

app.get('/css/mW.css', (req, res) => {
    res.sendFile(__dirname + '/css/moveWave.css')
})

http.listen(PORT, function() {
    console.log('Socket IO server listening on port', PORT);
});

var user_count = 0;

io.on('connection', socket => {
    var cnt = `User ${user_count++}`
    io.to(socket.id).emit('cnt', cnt);

    socket.on('send', data => {
        io.emit('send_msg', data)
        console.log(data)
    })

    socket.on('disconnect', () => {
        user_count--
    });
});