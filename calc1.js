var calc = {};
calc['add'] = function (a, b) {
    return a + b;
}

//module.export에 객체를 할당시킴
console.log(calc.add)
module.exports = calc;