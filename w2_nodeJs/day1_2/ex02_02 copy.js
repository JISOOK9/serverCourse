const http = require('http');
const express = require('express');
//require 할 때 확장자 제외
const util = require('./util');
const database = require('./db');
const db = new database();

const UserController = require('./user_controller');
const controller1 = new UserController();


const app = express();

const router = express.Router();
// => 미들웨어로 라우터 등록하면 모든 요청 받아서 분기 시킴
app.use('/', router);

router.route('/user/list').get(controller1.list);

router.route('/user/search').get(controller.search);


const port = 8912;
http.createServer(app).listen(port, ()=>{
    console.log('web server is ready : ' + port)
})


