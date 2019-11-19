//변수 유효범위
//js에서의 중괄호는 변수 측면에서는 무의미
//js에서의 변수는 함수 단위로 유효성 판단
//함수 hoisting : 실행 전에 스캔해서 메모리에 올려준다
//변수 전에 변수 사용되면 스캔해서 그 변수를 메모리에 올린다. 이 때 값은 올리지 않기 때문에 변수 선언만 된 상태 됨


{
    var title = 'test1';
    console.log('title->' + title)
}
console.log('title->' + title)

Building()
function Building() {
    console.log(title2);
    var title2='test2';
    console.log(title2);
}
console.log(title);
