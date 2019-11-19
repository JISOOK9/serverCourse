//ES6의 함수

function add(a, b) {
    return a + b;
}

const add2 = function(a,b){
    return a + b;
};

//arrow function
const add3 = (a, b) => {
    return a + b;
}

//arrow function 이 내부함수로 쓰이면 this를 실행시키는 실제 객체로 됨 -> inner function 은 arrow function으로 쓰는것 권장
myName = '지숙'
let mem = {
    myName:'지숙1',
    jobs:['걷다', '달리다'],
    showJobs: function(){
        this.jobs.forEach(function(job) {
            console.log(this.myName + '->' + job);
        })
    }
}
mem.showJobs();

const mem1 = {
    myName:'지숙1',
    jobs:['걷다', '달리다'],
    showJobs: function(){
        this.jobs.forEach((job) => {
            console.log(this.myName + '->' + job);
        })
    }
}
mem1.showJobs();