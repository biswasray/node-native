import process from "node:process";

process.on("message", (message, sendHandler) => {
  console.log("Recieved message:", message);
  console.log("Recieved by:", sendHandler);
});

// if (typeof process.send === "function") {
//   process.send("Hello world1", "Alien");
// } else {
//   process.emit("message", "Hello world2", "Alien");
// }
