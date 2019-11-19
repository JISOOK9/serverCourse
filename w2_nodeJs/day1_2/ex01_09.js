//this
//var 지시자 주지 않아도 변수가 됨
//기본적으로 global이라는 객체 있음
//var 붙이지 않으면 객체의 속성으로 들어가서 글로벌 변수 됨
//js표준에서 내부함수에서는 this가 글로벌 가르키지 않게 함

global.myName = '홍길동'
myName = '최규선'

var person1 = {
    myName:'구지숙',
    showName: function() {
        console.log('내 이름은 ? '+this.myName);
    }
}

person1.showName();

console.log('내 이름은 ? '+global.myName);

//[,]는 js에서 배열
var person2 = {
    myName : '구지숙2',
    tasks : ['걷다', '달리다'],
    showTask: function() {
        this.tasks.forEach(function(task) {
            console.log(this.myName + '->' + task);
        })
    }
}

person2.showTask();

var person3 = {
    myName : '구지숙3',
    tasks:['걷다', '달리다'],
    showTask:function() {
        //inner function 에서 this쓰지 못하므로 이런 방식으로 대입해서 접근
        //보통은 _this 이렇게 선언해서 씀
        var myThis = this;
        this.tasks.forEach(function(task) {
            console.log(myThis.myName + '->' + task);
        });
    }
}

person3.showTask();

var person4 = {
    myName : '구지숙4',
    tasks:['걷다', '달리다'],
    showTask:function() {
        //inner function 에서 this쓰지 못하므로 이런 방식으로 대입해서 접근
        //bind 함수를 이용
        var myThis = this;
        this.tasks.forEach(function(task) {
            console.log(this.myName + '->' + task);
        }.bind(person3));
    }
}

person4.showTask();
//bind를 통해 호출객체를 바꿔줄 수 있음
// 이 함수를 호출한 객체를 지정해주는 함수가 bind
//서버 쪽에서 저렇게 호출하는 객체에 따라 다르게 동작하도록 구현하고
//cl쪽에서 원하는 객체에 bind 혹은 apply하면 그대로 다르게 동작
//동적으로 동작하도록 만들 수 있음