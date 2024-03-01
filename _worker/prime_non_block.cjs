const {Worker,isMainThread,parentPort} = require("worker_threads");
function _isPrime(num) {
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
let worker;
if(!isMainThread) {
    parentPort.on("message",(data)=>{
        const result = _isPrime(Number(data));
        parentPort.postMessage(result);
        parentPort.close();
    });
    // worker = new Worker(__filename);
    // worker.on("message",(data)=>{
    //     console.log(data);
    // })
}

function isPrime(num) {
    return new Promise((resolve,reject)=>{
        worker = new Worker(__filename);
        worker.postMessage(num);
        worker.on("message",(data)=>{
            resolve(data);
        });
        worker.on("error",reject);
    });
    // parentPort.postMessage(num);
    // worker.addListener("message",(data)=>{
    //     const n = Number(data);
    //     if(!isNaN(n)) {
    //         const result = _isPrime(n);
    //     }
    // });
}

module.exports= {
    isPrime
}