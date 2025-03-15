// function isPrime(num) {
//     return new Promise((resolve,reject)=>{
//         if(num<2) {
//             return resolve(false);
//         }
//         let i, flag = true;
//         for (i = 2; i <= num - 1; i++) {
//             if (num % i == 0) {
//                 flag = false;
//                 break;
//             }
//         }
//         return resolve(flag);
//     });
// }       
// const {Worker,isMainThread,parentPort} = require("worker_threads");
const parentPort=self;
const isMainThread = !!(this?.Window && parentPort instanceof this.Window);
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
    parentPort.onmessage = (({data})=>{
        try{
            const result = _isPrime(Number(data));
            parentPort.postMessage(result);
        }catch(err) {
            parentPort.postMessage({type: "error",error:err});
        }
        parentPort.close();
    });
}
function isPrime(num,options = {}) {
    return new Promise((resolve,reject)=>{
        const worker = new Worker("./script.js");
        options?.signal?.addEventListener("abort",(event)=>{
            worker.terminate();
        },{once:true})
        worker.postMessage(num);
        worker.addEventListener("message",(data)=>{
            resolve(data);
        });
        worker.addEventListener("error",(err)=>{
            console.log(err);
            reject(err.error);
        });
        // worker.addEventListener("exit",reject);
    });
}

function check1() {
    const num = document.getElementById("num1").value;
    const p = document.getElementById("check1");
    isPrime(num).then((res)=>p.innerText=res.data?"Prime":"Not prime").catch(console.log);
}
function check2() {
    const num = document.getElementById("num2").value;
    const p = document.getElementById("check2");
    isPrime(num).then((res)=>p.innerText=res.data?"Prime":"Not prime").catch(console.log);
}
