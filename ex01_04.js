function getName() {
    var name = 'koo';
    return name;
}

console.log('getName 함수 실행->' + getName());

function getName2() {
    var name = 'kyu';
    function print() {
        console.log('내부 함수에서의 이름 -> ' + name);
    }

    print();

    return name;
}

console.log('getName2 함수 실행 ->' + getName2());
console.log('====')

function getName3(){
    var name = 'koo';
    return function () {
        console.log('내부 함수에서의 이름 -> ' + name);
        return function() {
            console.log('두번째 내부 함수 호출');
        }
    }
}

var varForFunc = getName3();
console.log(typeof(varForFunc));
varForFunc();
varForFunc()();
getName3()()()