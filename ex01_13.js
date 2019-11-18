//ES6 의 클래스

class Person{
    constructor(nick, age) {
        this.nick = nick;
        this.age = age;
    }
    //function 키워드 없음 클래스 내부에 메인메소드로 들어갈 경우
    showType() {
        console.log('type->person');
    }
}

const mem1 = new Person('구지숙', 20);
console.log('mem1 -> ' + JSON.stringify(mem1));
mem1.showType();

console.log ('mem1의 type->' + typeof(mem1));

if(mem1.showType === Person.prototype.showType) {
    console.log('showType is in prototype');
}

class Student extends Person {
    
}

const s1 = new Student('구지숙3', 20);
console.log(s1);
console.log(JSON.stringify(s1));