const {
    Worker,
    isMainThread,
  } = require("worker_threads");

function lazyFunc() {
    for(let i=0;i<10000000000;i++) {}
    console.log("lazyFunc  complete");
}
if(!isMainThread) {
    lazyFunc();
}

function run() {
    const worker = new Worker(__filename);
}

module.exports = {run}