console.log('hello nodejs');

//변수
var name = 'koo';
console.log('name->', name);
console.log('type of name->' + typeof(name));

var age = 20;
console.log('age->', age);
console.log('type of age->' + typeof(age));

var isW = false;
console.log('isW->'+isW)
console.log('type of isW-> ' + typeof(isW))

var testName;
console.log('type of testName-> ' + typeof(testName))
testName = null;
console.log('type of testName-> ' + typeof(testName))

//객체
var member = {};
member['name'] = 'koo';
member.age = age;
member.mobile = '01063606292'
console.log('type of testObj : ' + typeof(member))
console.log(member)

console.log('print member as string ->' + JSON.stringify(member))

//객체 내에 속성 추가할 때 var 로 선언안해도 됨
var member_2 = {
    name: 'koo',
    age: 20
}
console.log('print member2' + member_2)
console.log('print member2 as string' + JSON.stringify(member_2))