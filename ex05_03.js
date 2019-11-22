const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const redis = require('redis');

const redisOptions = {
    host:'127.0.0.1',
    port:6379
}

const store = redis.createClient(redisOptions);
const pub = redis.createClient(redisOptions);
const sub = redis.createClient(redisOptions);

store.on('error', (err) => {
    console.error('Redis store에서 에러 -> ' + err);
})

pub.on('error', (err) => {
    console.error('Redis pub에서 에러 -> ' + err);
})

sub.on('error', (err) => {
    console.error('Redis sub에서 에러 -> ' + err);
})

const channel = 'chat_channel';
sub.subscribe(channel);
console.log('Redis 구독함 -> ' + channel);


const app = express();

app.use('/', express.static(path.join(__dirname, 'public')))


let namespace;
const host='10.241.29.106';
const port = 7002;
const backlog = 20000;
const server = http.createServer(app).listen(port, host, backlog, () => {
    console.log(`웹 서버 실행됨 -> ${port}`)

    const serverHost = server.address().address;
    const serverPort = server.address().port;

    namespace = serverHost + '_' + serverPort + '_' + process.pid;
    console.log('Namespace -> ' + namespace);
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
 
        const userSocketUrl = path.join(namespace, socket.id);
        store.hset('user_channel', input.id, userSocketUrl, store.print);
        console.log('Redis에 user 정보 저장함 -> ' + userSocketUrl);

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

        sendData(input, true);

        const output = {
            command:'message',
            code:200,
            message:'OK'
        }
        socket.emit('response', output);
        
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

function sendData(input, resend) {

    store.hget('user_channel', input.receiver, (err, userSocketUrl) => {
        if (err) {
            console.error('Redis에서 사용자 값 가져오는 중 에러 -> ' + err);
            return;
        }

        if (userSocketUrl) {
            const inNamespace = path.dirname(userSocketUrl);
            const inSocketId = path.basename(userSocketUrl);
            console.log('확인된 소켓 ID -> ' + inNamespace + ', ' + inSocketId);

            if (inNamespace === namespace) {
                console.log('Namespace가 동일함');
 
                if (io.sockets.connected[inSocketId]) {
                    io.sockets.connected[inSocketId].emit('message', input);
                } else {
                    console.error('소켓 객체를 찾을 수 없음 -> ' + inSocketId);
                }
            } else {
                console.log('Namespace가 다름');

                if (resend) {
                    pub.publish(channel, JSON.stringify(input));
                    console.log('Redis publish 호출됨 -> ' + channel);
                } else {
                    console.log('resend가 false여서 전송 안함');
                }
            }

        }
    })

}

sub.on('message', (channel, data) => {
    console.log('Redis에서 메시지 받음 -> ' + channel);
    console.log('DATA -> ' + data);

    const input = JSON.parse(data);
    sendData(input, false);
})
