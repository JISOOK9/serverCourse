//es6문법
//ES6(JS 버전)의 변수
//중괄호 블럭의 의미 없는 js에서 의미 인식하도록 만든 변수가 let

if(true) {
    var a = 10;
    console.log("a->" + a);

    let b = 20;
    console.log('b->' + b);
}

console.log('a outside->' + a);
//console.log('b outside->' + b.bind(global.b));

// 기존  js에서 불변변수는 클로저 사용

const c = 10;
//c = 20
const names = ['멤버1', '멤버2'];
names.push('추가멤버');
names = ['새로만들기']
console.log(names)
//레퍼런스 바꾸는 경우 아니면(속성, 원소 등) const여도 변경 가능함

