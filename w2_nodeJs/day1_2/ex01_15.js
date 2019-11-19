//웹서버 실행
const http = require('http');
const express = require('express');

//클라이언트 요청 바디 안에 있는 내용을 파싱해주는 객체
//미들웨어로 등록하면 미리 파싱해서 전달해줌
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({encoded:false}));
app.use(bodyParser.json());

//http도 tcp소켓을 통해 전달
//query라는 속성에 parsing되어서 들어감
//라우터는 이 경로에 들어온 요청을 처리하도록 설정
//use로 등록한 미들웨어는 등록 순서로 실행됨 순서 주의!!
app.use("/", router);


router.route('/user/get').get((req, res)=>{
    console.log("user/get 요청됨");

    const params = req.query;
    console.log('params -> ' +  JSON.stringify(params))
    const user1 = {
        nick : 'koo',
        age : 20,
        date : '20191118'
    }
    const out = JSON.stringify(user1);
    
    sendRes(res, out);
})

router.route('/user/list').post((req, res)=>{
    console.log("/user/list 포스트 요청됨");

    const params = req.body;
    console.log('params -> '+JSON.stringify(params));

    const users =[
        {
            nick:'홍길동1',
            age:30
        },
        {
            nick:'홍길동2',
            age=50
        }
    ]
    const out = JSON.stringify(users);
    sendRes(res, out);
})

function sendRes(res, output) {
    
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.end(output);
}

let port = 8912
http.createServer(app).listen(port, ()=>{
    console.log("web server ready to listen : " +port);
})

