import { arch, argv, argv0, execPath } from "node:process";

console.log(`This processor architecture is ${arch}`);

console.log("First argument:",argv0);

console.log("Pathname of the executable:",execPath);

argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
