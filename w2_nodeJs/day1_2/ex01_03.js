//콜백함수 -> 함수를 다른 함수의 param으로 전달 가능

//callback이라는 함수를 param으로 전달한 것
function add (a, b, callback){
    // return a + b;
    var output = a+b;
    callback(output);
}

function myCallBack (param){
    console.log('myCallBack 함수에서 출력되는 값 ->' + param);
}

add(10, 10, myCallBack)

//1회성 실행 함수 사용
add(10, 10, function(result) {
    console.log('임시 콜백함수 안에서 ->' + result);
})

function div(a, b, callback){
    if(b == 0) {
        // console.error('0으로 나눠서는 안됨');
        callback('0으로 나눌 수 없음', null)
        return;
    }
    var result  = a / b;
    callback(null, result);

}

div(100, 0, function(err, result) {
    if(err) {
        console.error('에러 발생 : ' + err);
        return;
    }
    console.log('콜백함수 통해 나누기', result);

})