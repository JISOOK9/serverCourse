const resController = {};
const util = require("./util")
const config = require('./config')
//db연결
const mysql = require('mysql');
console.log(config.database);
const pool = mysql.createPool(config.database);

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

resController.searchId = (req, res)=>{
    console.log('/user/searchId is requested');
    const params = req.query;
    console.log('PARAMS-> ' + JSON.stringify(params));
    let sql = sqlConfig.userQuery.searchId;
    console.log(sql)
    pool.getConnection((err, conn)=>{util.runQuery(sql, params.id, res, err, conn)
    });
}

resController.searchName = (req, res)=>{
    console.log('/user/searchName is requested');
    const params = req.query;
    console.log('PARAMS-> ' + JSON.stringify(params));
    let sql = sqlConfig.userQuery.searchName;
    console.log(params.name)
    pool.getConnection((err, conn)=>{util.runQuery(sql, ['%' + params.name + '%'], res, err, conn)
    });
}

resController.index = (req, res)=>{
    const context = {
        username : 'john'
    };
    req.app.render('ex02_02', context, (err, html)=>{
        res.end(html);
    });
}

module.exports = resController;