const net = require('net')

const socket = new net.Socket();
socket.setEncoding('utf8');

const host = 'localhost';
const port = 7003;

socket.connect(port, host, () => {
    console.log(`소켓 서버 연결됨 -> ${host}, ${port}`)

    socket.write('안녕하세요!')
    console.log('서버로 데이터 전송함')
})


socket.on('error', (err) => {
    console.error(`에러 발생 -> ${err}`)
})

socket.on('close', () => {
    console.log('소켓 연결 종료됨')
})
