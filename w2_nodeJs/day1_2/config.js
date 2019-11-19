module.exports = {
    server : {
        port:7001
    },
    database:{
        
            host:'127.0.0.1',
            port: 3306,
            user:'root',
            password:'admin',
            database:'test',
            connectionLimit:10,  //풀 내에 커넥션 개수 제한
            debug:false
        
    },
    controller : [
        {
            method:'get',
            path: '/user/index',
            func:'index'
        },
        {
            method:'get',
            path: '/user/list',
            func:'list'
        },
        {
            method:'get',
            path: '/user/searchId',
            func:'searchId'
        },
        {
            method:'get',
            path: '/user/searchName',
            func:'searchName'
        }
    ]

}

