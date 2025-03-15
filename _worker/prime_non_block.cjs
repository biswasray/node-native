const {Worker,isMainThread,parentPort} = require("worker_threads");
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
// const controller = new AbortController();
function isPrime(num,options = {}) {
    return new Promise((resolve,reject)=>{
        const worker = new Worker(__filename);
        options?.signal?.addEventListener("abort",(event)=>{
            worker.terminate();
        },{once:true})
        worker.postMessage(num);
        worker.on("message",(data)=>{
            resolve(data);
        });
        worker.on("error",reject);
        worker.on("exit",reject);
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