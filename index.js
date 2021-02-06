var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var log = require('morgan');



const PORT = process.env.PORT || 5000;


app.use('/', express.static('static'));
app.use(express.json());
app.use(log('dev'));


app.get('/', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, smax-age=600');
    res.sendFile(__dirname + '/static/html/index.html')
})

app.get('/chat', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, smax-age=600');
    res.sendFile(__dirname + '/static/html/chat.html')
})

http.listen(PORT, function() {
    console.log('Socket IO server listening on port', PORT);
});


var user_count = 0;

io.on('connection', socket => {
    var db = low(new FileSync(`${__dirname}/db/chat.json`));
    

    var cnt = `User ${user_count++}`;
    io.to(socket.id).emit('cnt', cnt);
    
    socket.on('load', room_id => {
        const forDBroomid = replaceDot(room_id);

        if (db.get(forDBroomid).value() != undefined) {
            io.to(socket.id).emit('loadData', db.get(forDBroomid).value());
        }
    })

    socket.on('send', data => {
        var forDBroomid = replaceDot(data.room_id);
        db = low(new FileSync(`${__dirname}/db/chat.json`));

        io.emit('send_msg', data);

        if (db.get(forDBroomid).value() == undefined) {
            db.set(forDBroomid, []).write();
            db.get(forDBroomid).push(data).write();
        } else {
            db.get(forDBroomid).push(data).write();
        }
    })

    socket.on('disconnect', () => {
        user_count--;
    });
});


/**
 * @param {String} str 
 */
function replaceDot(str) {
    return str.replace(/[.]/g, '')
}