const {Worker,isMainThread,parentPort} = require("worker_threads");

if(!isMainThread) {
    parentPort.on("message",([func,...params])=>{
        const result = func.apply(null,params);
        parentPort.postMessage(result);
        parentPort.close();
    });
}
function wrap(func,options={}){
    const newFunc = function(...params) {
        return new Promise((resolve,reject)=>{
            const worker = new Worker(__filename);
            options?.signal?.addEventListener("abort",(event)=>{
                worker.terminate();
            },{once:true})
            worker.postMessage([func,...params]);
            worker.on("message",(data)=>{
                resolve(data);
            });
            worker.on("error",reject);
            worker.on("exit",reject);
        });
    }
    return newFunc;
}
module.exports = {
    wrap
}