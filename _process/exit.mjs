import process from 'node:process';
function someConditionNotMet() {
    return true;
}
function printUsageToStdout() {
    console.log("STDout");
}
// How to properly set the exit code while letting
// the process exit gracefully.
if (someConditionNotMet()) {
  printUsageToStdout();
  process.exitCode = 1;
  process.exit(1);
}
printUsageToStdout();