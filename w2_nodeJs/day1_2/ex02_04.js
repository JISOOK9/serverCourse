const http = require('http');
const express = require('express');
const path = require('path');

const util = require('./util');
const reqController = require('./reqController');
const config = require('./config');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.removeAllListeners('view engine', 'ejs');
console.log('뷰 엔진이 ejs로 설정됨');

//현재경로의 public폴더를 사용자에게 오픈하겠다 (이 경로의 파일은 다른 세부경로 없이 root주소/파일명 이렇게 접근 가능!)
app.use('/', express.static(path.join(__dirname, 'public')));
const router = express.Router();
// => 미들웨어로 라우터 등록하면 모든 요청 받아서 분기 시킴
app.use('/', router);

config.controller.forEach((item, index) => {
    //router.route(item.path)[item.method]((req, res)=>{reqController[item.func](req, res)})
    router.route(item.path)[item.method](reqController[item.func])
});

// router
//     .route('/user/list')
//     .get((req, res) => {
//         reqController.list(req, res)
//     });
// router
//     .route('/user/search')
//     .get((req, res) => {
//         reqController.search(req, res)
//     });
// router
//     .route('/user/add')
//     .get((req, res) => {
//         reqController.insert(req, res)
//     });
// router
//     .route('/user/modify')
//     .get((req, res) => {
//         reqController.update(req, res)
//     });
// router
//     .route('/user/remove')
//     .get((req, res) => {
//         reqController.delete(req, res)
//     });

http
    .createServer(app)
    .listen(config.server.port, () => {
        console.log('web server is ready : ' + config.server.port)
    })
