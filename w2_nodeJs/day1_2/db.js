const util = require('./util');
const resController = require('./reqController')
const config = require('./config');
//db연결
const mysql = require('mysql');
const pool = mysql.createPool(config.database)

class Database {
    constructor() {

    }

    query(res, sql, sqlParams, callback) {
        const query = conn.query(sql, sqlParams, (err, rows) => {

        })
    }
}