const Calc = require('./calc3');

const calc1 = new Calc();
console.log('이벤트 보내기 전')
calc1.emit('stop');
console.log('calc1객체로 stop이벤트보냄');
