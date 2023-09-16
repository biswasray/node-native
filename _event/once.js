const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.on('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// Prints: 1
myEmitter.emit('event');
// Prints: 2

let n = 0;
myEmitter.once('one', () => {
  console.log(++n);
});
myEmitter.emit('one');
// Prints: 1
myEmitter.emit('one');
// Ignored