const net = require('net');

const server = net.createServer((socket) => {
    server.getConnections((err, count) => {
        console.log(`클라이언트 연결 갯수 -> ${count}`)
    });

    socket.setEncoding('utf8');

    socket.on('data', (data) => {
        console.log(`수신 크기 -> ${socket.bytesRead}`)
        console.log(`DATA -> ${data}`)
    })

    socket.on('error', (err) => {
        console.error(`에러 발생 -> ${err}`)
    })

    socket.on('close', () => {
        console.log('소켓 연결 종료됨')
    })

});

const host = 'localhost';
const port = 7003;
server.listen(port, host, () => {
    const address = server.address();
    console.log(`소켓 서버 실행됨 -> ${address.address}, ${address.port}`)
});