import process from "node:process";

process.on("warning", (warning) => {
  console.warn(warning.name); // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack); // Print the stack trace
  if (warning.detail) console.warn(warning.detail); // 'This is some additional information'
});

process.emitWarning("Custom Warning");

function divide(a, b) {
  if (b == 0) {
    process.emitWarning(new Error("Can not divided by zero"));
    // it returns;
  }
  console.log(`${a} / ${b} = ${a / b}`);
}

divide(6, 0);

process.emitWarning("Something happened!", {
  code: "MY_WARNING",
  detail: "This is some additional information",
});
