
const mysql = require('mysql')
const config = require('./config')

class Database {
    constructor(host, user, password, database) {
        this.pool = mysql.createPool(config.database)
    }

    query(sql, sqlParam, cb) {
        this.pool.getConnection((err, conn) => {
            if (err) {
                conn.release()
                if (cb) 
                    cb('Connection failed', err)
                return
            }
        
            console.log('Connection id : ' + conn.threadId)
                
            const query = conn.query(sql, sqlParam, (err, rows) => {
                if (conn) {
                    conn.release()
                }
    
                console.log('SQL -> ' + query.sql)
    
                if (err) {
                    console.log('SQL문 실행 시 에러')
                    if (cb) 
                        cb('execute SQL failed', err)
                    return
                }
        
                if (cb)
                    cb(null, rows)
            })
        })
    }
}

module.exports = Database