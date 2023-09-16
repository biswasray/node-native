const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const logger = [];
eventEmitter.on('data-list', (level, array) => {
  setImmediate(() => {
    for(const item of array) {
        logger.push(`${level}: ${item}`);
    }
    console.log(`After ${level} complete:`,logger);
  });
});

const arr=new Array(10).fill(0).map((item,i)=>item+i);

eventEmitter.emit("data-list","A",arr);
eventEmitter.emit("data-list","B",arr);
eventEmitter.emit("data-list","C",arr);

console.log("Final: ",logger);