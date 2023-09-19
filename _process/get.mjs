import process, { getActiveResourcesInfo } from "node:process";

console.log("Before:", getActiveResourcesInfo());
setTimeout(() => {}, 1000);
console.log("After:", getActiveResourcesInfo());
// Prints:
//   Before: [ 'CloseReq', 'TTYWrap', 'TTYWrap', 'TTYWrap' ]
//   After: [ 'CloseReq', 'TTYWrap', 'TTYWrap', 'TTYWrap', 'Timeout' ]
if (process.getegid) {
  console.log(`Current egid: ${process.getegid()}`);
}

if (process.geteuid) {
  console.log(`Current euid: ${process.geteuid()}`);
}

if (process.getgid) {
  console.log(`Current gid: ${process.getgid()}`);
}

if (process.getgroups) {
  console.log(process.getgroups()); // [ 16, 21, 297 ]
}

if (process.getuid) {
  console.log(`Current uid: ${process.getuid()}`);
}
