const {
	Worker,
	isMainThread,
	setEnvironmentData,
	getEnvironmentData,
} = require("node:worker_threads");

// if (isMainThread) {
// 	setEnvironmentData("Hello", "World!");
// 	const worker = new Worker(__filename);
// } else {
// 	console.log(getEnvironmentData("Hello")); // Prints 'World!'.
// }

function wrapa(func,options = {}) {
	return function(...params) {
		const script = `
		const {
			parentPort
		} = require("node:worker_threads");
		${func.toString()}
		parentPort.on("message",(data)=>{
			const result = ${func.name}.apply(null,data);
			parentPort.postMessage(result);
			parentPort.close();
		});
		`;
		return new Promise((resolve,reject)=>{
			const worker = new Worker(script,{eval:true});
			options?.signal?.addEventListener("abort",(event)=>{
				worker.terminate();
			},{once:true})
			worker.postMessage(params);
			worker.on("message",(data)=>{
				resolve(data);
			});
			worker.on("error",reject);
			worker.on("exit",reject);
		});
	}
}

module.exports= {wrapa}