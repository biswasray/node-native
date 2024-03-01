const { spawn } = require('node:child_process');
// const ls = spawn('cmd', []);

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

const control = new AbortController();

const sig = spawn("node",["../_process/signal.mjs"],{signal: control.signal});
sig.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

sig.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

sig.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
// setTimeout(()=>{
//   control.abort();
// },900);