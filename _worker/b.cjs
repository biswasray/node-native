// const {
//     Worker,
//     isMainThread,
//   } = require("worker_threads");

const { wrapa } = require("./a.cjs");


function lazyFunc() {
    for(let i=0;i<10000000000;i++) {}
    console.log("lazyFunc  complete");
}
function _isPrime(num) {
    if(typeof num !=="number" || isNaN(num)) {
        throw new Error("Invalid input")
    }
    if(num<2) {
        return false;
    }
    let i, flag = true;
    for (i = 2; i <= num - 1; i++) {
        if (num % i == 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
// lazyFunc.apply()
const controller = new AbortController();
const dd=wrapa(lazyFunc);
dd().then(da=>console.log("hg",da));
const isPa = wrapa(_isPrime,{signal: controller.signal});
isPa(936868033).then(console.log).catch(console.log);

controller.abort()
// if(!isMainThread) {
//     lazyFunc();
// }

// function run() {
//     const worker = new Worker(__filename);
// }

// module.exports = {run}