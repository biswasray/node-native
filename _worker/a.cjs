const {
	Worker,
	isMainThread,
	setEnvironmentData,
	getEnvironmentData,
} = require("node:worker_threads");

if (isMainThread) {
	setEnvironmentData("Hello", "World!");
	const worker = new Worker(__filename);
} else {
	console.log(getEnvironmentData("Hello")); // Prints 'World!'.
}
