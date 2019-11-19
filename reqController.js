const resController = {};
const util = require("./util")

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

const sqlConfig = require('./sql_config');

resController.list = (req, res)=> {
    console.log('/user/list is requested');
    const params = req.query;
    console.log('PARAMS-> ' + JSON.stringify(params));
    const sql = sqlConfig.user.list;
    pool.getConnection((err, conn)=>{
        util.runQuery(sql, [], res, err, conn)
    });
}

resController.search = (req, res)=>{
    console.log('/user/search is requested');
    const params = req.query;
    console.log('PARAMS-> ' + JSON.stringify(params));
    let sql = sqlConfig.user.search;
    console.log(params.name)
    pool.getConnection((err, conn)=>{util.runQuery(sql, ['%' + params.name + '%'], res, err, conn)
    });
}

resController.insert = (req, res)=>{
    console.log('/user/add is requested');
    const params = req.query;
    console.log('PARAMS-> ' + JSON.stringify(params));
    let sql = sqlConfig.user.add;
    pool.getConnection((err, conn)=>{util.runQuery(sql, [params.name, params.age], res, err, conn)
    });
}

//id를 넘기기
resController.update = (req, res)=>{
    console.log('/user/modify is requested');
    const params = req.query;
    console.log('PARAMS-> ' + JSON.stringify(params));
    
    let sql = sqlConfig.user.update;
    
    pool.getConnection((err, conn)=>{util.runQuery(sql, [params.name, params.age, params.id], res, err, conn)
    });
}

resController.delete = (req, res)=>{
    console.log('/user/remove is requested');
    const params = req.query;
    console.log('PARAMS-> ' + JSON.stringify(params));
    let sql = sqlConfig.user.remove;
    pool.getConnection((err, conn)=>{util.runQuery(sql, [params.id], res, err, conn)
    });
}

module.exports = resController;
