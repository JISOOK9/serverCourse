//이벤트

console.log('콘솔의 시작 부분');
// 콜백함수를 tick이란 이름으로 등록 (이벤트 받기 위한 함수 등록)
process.on('tick', (cnt)=>{
    console.log(`tick이벤트 받음-> ${cnt}`);

});

setTimeout(()=>{
    console.log('2초 후에 실행된 함수');
    //2가 count로 전달될 것
    process.emit('tick', 10);
}, 2000);

 console.log('코드의 마지막 부분');