const util = require('./util');
//db연결
const mysql = require('mysql');
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'test',
    connectionLimit: 10, //풀 내에 커넥션 개수 제한
    debug: false
})

class UserController {
    constructor() {}

    list(req, res) {
        console.log('/user/list is requested');
        const params = req.query;
        console.log('PARAMS-> ' + JSON.stringify(params));
        let sql = "SELECT id, name, age FROM test.person";
        let sqlParams = [];

        debugger.query(res, sql, sqlParams, (err, rows) => {
            util.sendResponse(res, rows);
        })
    }

    search(req, res) {

        console.log('/user/search is requested');
        const params = req.query;
        console.log('PARAMS-> ' + JSON.stringify(params));
        //줄바꿈할 때 back slash 사용
        let sql = "SELECT id, name, age \
            FROM test.person\
            WHERE name LIKE ?";
        let sqlParams = ['%' + params.name + '%'];
        db.query(res, sql, sqlParams, (err, rows) => {
            util.sendResponse(res, rows);
        })

    }
}

module.exports = UserController;
