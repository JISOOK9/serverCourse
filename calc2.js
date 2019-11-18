var myCalc = {};

myCalc.add = function(a, b, callback) {
    var out = a + b;
    callback(null, out);
}

myCalc.sub = function (a, b, callback) {
    var out = a - b;
    callback(null, out);
}

myCalc.mtp = function (a, b, callback) {
    var out = a * b;
    callback(null, out);
}

myCalc.div = function (a, b, callback) {
    if(b==0) {
        callback('0으로 나눌 수 없음', null);
        return;
    }
    var out = a / b;
    callback(null, out);
}

module.exports = myCalc;