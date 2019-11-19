
const http = require('http');
const express = require('express');
//require 할 때 확장자 제외
const util = require('./util');

//db연결
const mysql = require('mysql');
const pool = mysql.createPool({
    host:'127.0.0.1',
    port: 3306,
    user:'root',
    password:'admin',
    database:'test',
    connectionLimit:10,  //풀 내에 커넥션 개수 제한
    debug:false
})

const app = express();

const router = express.Router();
// => 미들웨어로 라우터 등록하면 모든 요청 받아서 분기 시킴
app.use('/', router);

router.route('/user/list').get((req, res)=>{
    console.log('/user/list is requested');
    const params = req.query;
    console.log('PARAMS-> ' + JSON.stringify(params));
    pool.getConnection((err, conn)=>{
        if(err) {
            console.log(' Error occured while db connection -> ' + err);
            util.sendError(res, ' Error occured while db connection -> ' + err);
            return;
        }
        let sql = "SELECT id, name, age FROM test.person"
        conn.query(sql, [], (err, rows)=>{
            if(conn) {
                conn.release();//conn 사용 후 해제
            }

            if(err){
                console.log(' Error occured while sql execution -> ' + err);
                util.sendError(res, ' Error occured while sql execution -> ' + err);
                return;
            }

            console.log('ROWS -> ' + JSON.stringify(rows)); //rows 는 객체로 만들어지고 그 안에 속성으로 각 칼럼값이 들어감

            //const out = JSON.stringify(rows);
            util.sendResponse(res, rows);
        })
        //두번째 배열은 prepared statement(?로 값 채워넣기) 위한 것
    });
    //db 처리

    //응답 보내주기
    //res.header

});

router.route('/user/search').get((req, res)=>{
    console.log('/user/search is requested');
    const params = req.query;
    console.log('PARAMS-> ' + JSON.stringify(params));
    pool.getConnection((err, conn)=>{
        if(err) {
            console.log(' Error occured while db connection -> ' + err);
            util.sendError(res, ' Error occured while db connection -> ' + err);
            return;
        }
        //줄바꿈할 때 back slash 사용
        let sql = "SELECT id, name, age \
        FROM test.person\
        WHERE name LIKE ?";

        const query = conn.query(sql, ['%' + params.name + '%'], (err, rows)=>{
            if(conn) {
                conn.release();//conn 사용 후 해제
            }

            console.log('SQL ->' + query.sql);

            if(err){
                console.log(' Error occured while sql execution -> ' + err);
                util.sendError(res, ' Error occured while sql execution -> ' + err);
                return;
            }

            console.log('ROWS -> ' + JSON.stringify(rows)); //rows 는 객체로 만들어지고 그 안에 속성으로 각 칼럼값이 들어감

            //const out = JSON.stringify(rows);
            util.sendResponse(res, rows);
        })
        //두번째 배열은 prepared statement(?로 값 채워넣기) 위한 것
    });
    //db 처리

    //응답 보내주기
    //res.header

});

const port = 8912;
http.createServer(app).listen(port, ()=>{
    console.log('web server is ready : ' + port)
})


