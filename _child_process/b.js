// b.js
const { spawn } = require('child_process');

// Specify the path to the script you want to run
const scriptPath = 'a.js';

// Spawn a new process to run the script
const childProcess = spawn('node', [scriptPath]);

// Listen for the 'data' event to capture the output of the script
childProcess.stdout.on('data', (data) => {
  console.log(`Output from ${scriptPath}: ${data}`);
});

// Listen for the 'exit' event to know when the script has finished running
childProcess.on('exit', (code) => {
  console.log(`${scriptPath} exited with code ${code}`);
});
