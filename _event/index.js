const events = require("events");

class MyEmitter extends events.EventEmitter {}
const eventEmitter = new MyEmitter();

eventEmitter.on("data", function (input) {
  console.log(`Data: ${input}`);
});

eventEmitter.on("data", function (input) {
  console.log(`Again Data: ${input}`);
});

eventEmitter.addListener("connection", function () {
  console.log("connection successful.");
  eventEmitter.emit("data", "Hello World");
});

eventEmitter.emit("connection");
