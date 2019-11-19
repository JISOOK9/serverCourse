const util = {};

util.sendResponse = (res, out)=>{
    const outType = typeof(out);
    console.log('out Type : ' + outType);

    let result = out;

    if(outType == 'object'){
        result = JSON.stringify(out);
    }

    const result2 = {
        code:200,
        message:'OK',
        data:out
    }

    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'});
    res.end(JSON.stringify(result));
}

//util객체에 속성으로  function 넣는 것
util.sendError = (res, out) =>{
    const result = {
        code:400,
        message:out,
    }
        //클라이언트에 에러 전송 
    res.writeHead(result.code, {'Content-Type' : 'text/html;charset=utf8'});
    res.end(JSON.stringify(out))
}

util.runQuery = (sql, params, res, err, conn)=>{
    if(err) {
        console.log(' Error occured while db connection -> ' + err);
        util.sendError(res, ' Error occured while db connection -> ' + err);
        return;
    }

    conn.query(sql, params, (err, rows)=>{
        if(conn) {
            conn.release();//conn 사용 후 해제
        }

        if(err){
            console.log(' Error occured while sql execution -> ' + err);
            util.sendError(res, ' Error occured while sql execution -> ' + err);
            return;
        }

        console.log('ROWS -> ' + JSON.stringify(rows)); //rows 는 객체로 만들어지고 그 안에 속성으로 각 칼럼값이 들어감

        //const out = JSON.stringify(rows);
        util.sendResponse(res, rows);
    })
    //두번째 배열은 prepared statement(?로 값 채워넣기) 위한 것
}
module.exports = util;
