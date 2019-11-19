//클래스 (js에서는 프로토타입 객체) - 자바에서 클래스 만들고 new로 찍어내는 것과 동일한 방식 function을 클래스처럼
//function 을 new로 찍어내면 클래스 같음
//함수인지 객체 생성자인지는 함수 생성할 때가 아닌 함수 호출시점에 결정됨

//생성자로 실행될 때는 this가 글로벌임

function Person(name, age) {
    this.nick = name;
    this.age = age;
    console.log(this)
}
//붕어빵 틀에 함수 추가
Person.prototype.walk=function(speed) {
    console.log(nick + '멤버가 ' +speed + '속도로 걷다')
}
var mem0 = Person('testUser', 30);
console.log('mem0의 type -> ' + typeof(mem0))
console.log(mem0)
//var mem1 = new Person('구지숙', 30)
var mem1 = new Person()
{
    CountQueuingStrategy(mem1)
}
console.log('mem1의 type -> ' + typeof(mem1))
var mem2 = new Person('최규선', 33)
mem1.walk(10)