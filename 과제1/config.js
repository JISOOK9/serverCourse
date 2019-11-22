module.exports = {
    server: {
        port: 7001
    },
    database: {
        host: 'localhost',
        port: 3306,
        connectionLimit: 10,
        user: 'root',
        password: 'root',
        database: 'test',
        debug: false
    },
    controller: [
        {
            method: 'get',
            path: '/customer/read',
            func: 'read'
        }
    ]
}