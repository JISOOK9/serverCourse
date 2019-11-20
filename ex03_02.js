const http = require('http');
const express = require('express');
const path = require('path');
//post방식일 때는 바디로 들어오는 data 파싱해야 함
const bodyParser = require('body-parser');

const util = require('./util');
const reqController = require('./reqController');
const config = require('./config');

const app = express();

const cookieParser = require('cookie-parser');
//express에서 제공하는 session lib
const expressSession = require('express-session')

const multer = require('multer');
//파일시스템 작업
const fs = require('fs');

//ejs 를 위한 설정
app.set('views', path.join(__dirname, 'views'));
app.removeAllListeners('view engine', 'ejs');
console.log('뷰 엔진이 ejs로 설정됨');

//현재경로의 public폴더를 사용자에게 오픈하겠다 (이 경로의 파일은 다른 세부경로 없이 root주소/파일명 이렇게 접근 가능!)
app.use('/', express.static(path.join(__dirname, 'public')));

//라우터 설정 전에 미들웨어로 등록해야 함!!!
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//함수로 실행
app.use(cookieParser());

app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialize: true
}));

//디스크 저장 메모리 저장 결정
const storage = multer.diskStorage({
    
    destination: (req, file, callback)=>{
        callback(null, 'upload');//저장폴더를 uplod로 지정
    },
    //고유이름 설정
    filename: (req, file, callback) =>{
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);

        callback(null, basename + Date.now() + extension);
    }

});

const upload = multer({
    storage:storage,
    limits:{
        files:10,
        fileSize:1024*1024*1024,
    }
})

const router = express.Router();
// => 미들웨어로 라우터 등록하면 모든 요청 받아서 분기 시킴
app.use('/', router);

config.controller.forEach((item, index) => {
    //router.route(item.path)[item.method]((req, res)=>{reqController[item.func](req, res)})
    router.route(item.path)[item.method](reqController[item.func])
});
//파일컨텐츠는 바디 안에 들어와야 하기 때문에 post로 처리
//callback함수로 controller1.upload설정한 것

router.route('/upload').post(upload.array('image', 1), reqController.upload);
http
    .createServer(app)
    .listen(config.server.port, () => {
        console.log('web server is ready : ' + config.server.port)
    })
