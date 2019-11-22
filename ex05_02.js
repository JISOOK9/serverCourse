const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')))


const port = 7001;
const server = http.createServer(app).listen(port, () => {
    console.log(`웹 서버 실행됨 -> ${port}`)
});

const login_ids = {}

const io = socketio.listen(server);
console.log('채팅 서버 준비됨');

io.sockets.on('connection', (socket) => {
    console.log('socket info -> ' + JSON.stringify(socket.request.connection._peername));

    socket.on('login', (input) => {
        console.log('login 이벤트 받음');
        console.log('INPUT -> ' + JSON.stringify(input));
        console.log('접속된 소켓의 ID -> ' + socket.id);

        login_ids[input.id] = socket.id;

        const output = {
            command:'login',
            code:200,
            message:'OK'
        }
        socket.emit('response', output);
    })

    socket.on('message', (input) => {
        console.log('message 이벤트 받음');
        console.log('INPUT -> ' + JSON.stringify(input));

        console.log('상대방 소켓 ID -> ' + login_ids[input.receiver]);
        
        if (login_ids[input.receiver]) {
            io.sockets.connected[login_ids[input.receiver]].emit('message', input);

            const output = {
                command:'message',
                code:200,
                message:'OK'
            }
            socket.emit('response', output);
        } else {
            const output = {
                command:'message',
                code:400,
                message:'상대방을 찾을 수 없습니다 : ' + input.receiver
            }
            socket.emit('response', output);
        }
    })

    socket.on('room-join', (input) => {
        console.log('room-join 이벤트 받음')
        console.log(`INPUT -> ${JSON.stringify(input)}`)

        socket.join(input.room);

        const output = {
            command:'room-join',
            code:200,
            message:'OK'
        }
        socket.emit('response', output);
    });

    socket.on('room-leave', (input) => {
        console.log('room-leave 이벤트 받음')
        console.log(`INPUT -> ${JSON.stringify(input)}`)

        socket.leave(input.room);

        const output = {
            command:'room-leave',
            code:200,
            message:'OK'
        }
        socket.emit('response', output);
    })

    socket.on('room-message', (input) => {
        console.log('room-message 이벤트 받음')
        console.log(`INPUT -> ${JSON.stringify(input)}`)

        io.to(input.room).emit('room-message', input);

        const output = {
            command:'room-message',
            code:200,
            message:'OK'
        }
        socket.emit('response', output);
    })
})
