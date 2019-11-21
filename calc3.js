const EventEmitter = require('events').EventEmitter;

const Util = require('util');
const Calc = function(){
    //this 쓸 때는 arrow말고 일반 함수 권장
    //on()으로 이벤트 등록, emit으로 실행
    console.log('이게 생성자 함수라고?')
    this.on('stop', ()=>{
        console.log('Calc의 stop 호출됨')
    });
}

//EventEmitter를 상속하겠다
Util.inherits(Calc, EventEmitter);

module.exports=Calc;