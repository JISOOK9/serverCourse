//함수

function testFuncAdd(a, b) {
    console.log('testFuncAdd is called')
    return a + b
}

var output = testFuncAdd(12, 23);
console.log(output)

//js에서는 함수를 1급객체로 다룬다 -> 함수를 변수에 할당할 수 있다 (공간이 같다?)
//함수를 변수에 할당, 이 때 함수는 anonymous function으로 만들어야 (중복 이름 생기지 않도록 하기 위해)
//변수에 할당할 때는 함수 이름 명시하지 않음
//객체 안의 변수?를 속성(attribute, property)이라고 부름
//속성은 , 로 구분 이름 값은 : 로 구분
//함수를 변수에 할당할 수 있기 때문에 함수의 리턴값으로 함수를 그대로 넣을 수도 있고
//콜백함수
var varForFunc = function (a, b){
    return a + b;
}
console.log(varForFunc)
console.log(varForFunc(20, 30))
var varForAddFunc = testFuncAdd;
console.log(varForAddFunc)
console.log(testFuncAdd)
console.log(testFuncAdd != varForAddFunc)
console.log('type of varForAddFunc' + typeof(testFuncAdd))

console.log(varForAddFunc(11, 11))

var newMember = {
    name:'kyu',
    age: 30,
    newFuncAdd: function (a ,b){
        return a+b;
    }
}
console.log(newMember.newFuncAdd(1, 2));
console.log(newMember['newFuncAdd'](1, 2));



