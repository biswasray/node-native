const isMainThread = !(this?.window) && this?.window===this?.window?.top;
const parentPort=self;
function _isPrime(num) {
    console.log("iuygfd")
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

// if(isMainThread) {
    
// }
console.log(self);
    parentPort.onmessage = (({data})=>{
        console.log("yt")
        const result = _isPrime(Number(data));
        parentPort.postMessage(result);
        parentPort.close();
    });