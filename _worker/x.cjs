const {parentPort} = require("worker_threads");

parentPort.on("message",(value)=>{
    console.log(value);
})
