//문자열 변수 선언하고
//거기에 실행할 함수 타입을 넣어서 이 문자열을 통해 호출하기

var importedCalc = require("./calc2"); 

var cmdArr = ['add', 'sub', 'mtp', 'div'];

for(var i = 0;i<4;i++){
    var cmdStr = cmdArr[i];
    importedCalc[cmdStr](23,0,function(err, out) {
        if(err) {
            console.log('에러 발생 : ' + err);
            return;
        }
        else {
            console.log(cmdStr + '계산 결과는 : ' + out);
            return;
        }
    })

}
