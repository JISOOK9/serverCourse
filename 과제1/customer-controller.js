const Database = require('./database')
const sqlConfig = require('./sql-config')

const util = require('./util')

class CustomerController {
    constructor() {
        this.database = new Database('localhost', 'root', 'root', 'test')
    }

    read(req, res) {
        console.log('/customer/read 요청됨')
    
        let sql = sqlConfig.customer.read
        let sqlParams = []

        console.log(Object.keys(req.query))
        const keys = Object.keys(req.query)
        const keyLen = keys.length
        if (keyLen > 0) {
            sql = sql.concat(' where ')
        }
        
        for (let i=0; i<keyLen; i++) {
            let key = keys[i]
            let value = req.query[key]
            console.log('{'+key + ':' + value+'}')
            
            if (key === 'name') {
                sql = sql.concat(keys[i]).concat(' like ?')
                value = ('%').concat(value).concat('%')
            } else if (key === 'id') {
                sql = sql.concat(keys[i]).concat(' = ?')
                value *= 1
            }
            sqlParams.push(value)
            
            if (i < keyLen-1)
                sql = sql.concat(' and ')
        }

        this.database.query(sql, sqlParams, (err, data) => {
            if (err) {
                console.log(err)
                util.sendError(res, err)
                return
            }
    
            // post는 body에 data가 있다
            const params = req.body
            console.log('PARAMS: ' + JSON.stringify(params))
            
            util.sendResponse(res, data)
        })
    }
}

module.exports = CustomerController