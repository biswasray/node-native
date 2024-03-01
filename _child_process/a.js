// a.js
const process = require('node:process');

console.log("Hello from a.js!");

// process.on('SIGINT', () => {
//   console.log('Received SIGINT. Press Control-D to exit.');
//   process.exit(1);
// });
process.stdin.resume();

// Using a single function to handle multiple signals
function handle(signal) {
  console.log(`Received ${signal}`);
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
process.on("SIGKILL",handle);
process.on("SIGBREAK",handle);
