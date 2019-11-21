//웹서버 만들기

const http = require('http')
const express = require('express')
const socketio = require('socket.io');
const path = require('path');

const app = express();
app.use('/', express.static(path.join(__dirname, 'public')))

const port = 8912;
const server = http
    .createServer(app)
    .listen(port, () => {
        console.log(`web server starts running-> ${port}`);

    })
const login_ids = {}

//server 위에서 io
const io = socketio.listen(server);
console.log('채팅서버 준비됨');
//on은 수신할 이벤트 받는 함수 socket은 클라이언트 쪽 요청 처리할 객체
io
    .sockets
    .on('connection', (socket) => {
        console.log(`연결 이벤트 받음`)
        console.log(
            `socket info -> ${JSON.stringify(socket.request.connection._peername)}`
        )
        socket.on('login', (input) => {
            console.log('로그인 이벤트 받음')
            console.log(`socket info -> ${JSON.stringify(input)}`)
            console.log(`접속된 소켓 id -> ${socket.id}`);

            login_ids[input.id] = socket.id;

            const output = {
                command: 'login',
                status: 'ok',
                code: 200
            }

            socket.emit('response', output)
        })
        socket.on('message', (input) => {
            console.log('message이벤트 받음 INPUT=> ' + JSON.stringify(input))

            if (login_ids[input.receiver]) {
                //로그인 아이디를 통해 소켓아이디 찾음
                io
                    .sockets
                    .connected[login_ids[input.receiver]]
                    .emit('message', input);

                const output = {
                    command: 'message',
                    status: 'ok',
                    code: '200'
                }
                socket.emit('response', output);

            } else {
                const output = {
                    command: 'message',
                    code: 400,
                    status: '상대방을 찾을 수 없음'
                }
                socket.emit('response', output)
            }
        })
    })
