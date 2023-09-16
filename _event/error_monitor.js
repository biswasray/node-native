const { EventEmitter, errorMonitor } = require("node:events");

const myEmitter = new EventEmitter();
myEmitter.on(errorMonitor, (err) => {
  console.log(err);
});
myEmitter.on("error", (err) => {
  console.error("whoops! there was an error");
});
myEmitter.emit("error", new Error("whoops!"));
// Still throws and crashes Node.js
