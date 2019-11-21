const add = (a, b, callback) => {
    setTimeout(() => {
        const result = a + b;
        callback(null, result);
    }, 500)
}

const divide = (a, b, callback) => {
    setTimeout(() => {
        if (b === 0) {
            callback(new Error('0으로 나눌 수 없음'), null);
            return;
        }
        const result = a / b;
        callback(null, result);
    }, 1000)
}

const doCalc1 = () => {
    divide(1, 2, (err, result) => {
        console.log(`doCalc1()의 나누기 결과 -> ${result}`);
    })
    add(1, 2, (err, result) => {
        console.log(`doCalc1()의 더하기 결과 -> ${result}`);
    })
}

doCalc1();

const doCalc2 = () => {
    try {
        divide(1, 0, (err, result) => {
            console.log(`doCalc2()의 나누기 결과 -> ${result}`);
        })
        add(1, 2, (err, result) => {
            console.log(`doCalc2()의 더하기 결과 -> ${result}`);
        })
    } catch (err) {
        console.log(`doCalc2에서 에러 확인 ${err}`);
    }

}
// 에러를 콜백으로 던지면 에러로 catch안됨(시스템에서 에러로 안봄) try-catch는 비동기에서 에러 못잡음 -> 콜백함수에서
// 처리해줘야 함

doCalc2();

const doCalc3 = () => {
    divide(200, 100, (err, result) => {
        if (err) {
            console.err(`Error 발생 => ${err}`);
            return;
        }
        console.log(`doCalc3()의 나누기 결과 => ${result}`);
        add(result, 100, (addErr, addResult) => {
            if (addErr) {
                console.Error(`Error 발생 => ${addErr}`);
                return;
            }
            console.log(`doCalc3()의 더하기 결과 => ${addResult}`);
        })
    })
}
doCalc3(); 

//Promise 객체 래퍼 펑션만 await와 함께 쓸 수 있음

const divideFunc = (a, b)=>new Promise((resolve, reject)=>{
    divide(a, b, (err, result)=>{
        if(err) {
            reject(err);    //reject()는 return되는 효과
        }
        resolve(result);
    });
})

const addFunc = (a, b)=>new Promise((resolve, reject)=>{
    add(a, b, (err, result)=>{
        if(err) {
            reject(err);    //reject()는 return되는 효과
        }
        resolve(result);
    });

})

//async awiat 쓰면 에러 catch 가능
const doCalc4 = async ()=>{
    try{
        const result = await divideFunc(200, 0);
        console.log(`doCalc4의 나누기 결과 => ${result}`);
    
        const result2 = await addFunc(result, 100);
        console.log(`doCalc4의 더하기 결과 => ${result2}`);
    } catch(err){
        console.error(`에러 확인 -> ${err}`);
    }
    
}
doCalc4();