const resController = {};
const util = require("./util")

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
module.exports = resController;