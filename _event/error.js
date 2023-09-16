const EventEmitter = require("node:events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on("error", (err) => {
  console.error("whoops! there was an error");
});

myEmitter.on("data",function() {
    throw new Error("Custom error");
});

myEmitter.emit("error", new Error("whoops!"));
// Throws and crashes Node.js
myEmitter.emit("data");