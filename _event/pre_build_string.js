const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// Only do this once so we don't loop forever
// myEmitter.once('newListener', (event, listener) => {
//   if (event === 'event') {
//     // Insert a new listener in front
//     myEmitter.on('event', () => {
//       console.log('B');
//     });
//   }
// });
myEmitter.on('newListener',()=>{
    console.log("newListener beings called")
});


myEmitter.on('removeListener',()=>{
    console.log("removeListener beings called")
});

myEmitter.on('event', () => {
  console.log('A');
});
myEmitter.emit('event');
// Prints:
//   B
//   A