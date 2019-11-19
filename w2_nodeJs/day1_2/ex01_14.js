//웹서버 만들기
//패키징된 모듈 import 할 때는 경로 안써도 됨
//미들웨어 : req오면 무조건 실행되도록 만들어둔 함수. app.use()로 미들웨어 등록함
// 응답보내면 연결 끊김..?

const http = require('http');
const express = require('express');

const app = express();

app.use((req, res, next)=>{
    console.log("1st Middleware is called");
    req.user = 'jisook';
    next(); //다음 미들웨어 호출
})  
app.use((req, res, next)=>{
    console.log("2nd Middleware is called -> " + req.user);
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.end("<h1>Response Page</h1>")
})
http.createServer(app).listen(8912, ()=>{
    console.log("web server is ready to listen. port no : 8912")
});
