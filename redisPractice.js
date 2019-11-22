const redis = require('redis');
const redisOptions = {
    host:'localhost',
    port:6379
}

const store = redis.createClient(redisOptions);
store.on('error', (err)=>{
    console.error('Redis store error-> ' + err);

})

const setData = (userId, userName)=>{
    console.log('setData 호출됨->' + userId + userName);
    store.hset('users', userId, userName, redis.print);
    console.log('redis에 정보 저장')

}

const getData = (userId)=>{
    console.log('getData 호출' + userId);

    store.hget('users', userId, (err, result)=>{
        if(err) {
            console.err(`redis 조회 시 에러 발생 -> ` + err)
            return;
        }

        console.log(`조회결과 -> ${result}`)
    })
}

setData('test01', '홍길동1')
getData('test01');