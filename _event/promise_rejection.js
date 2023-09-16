const {EventEmitter,captureRejectionSymbol} = require('node:events');
const ee = new EventEmitter({ captureRejections: true });
ee.on('something', async (value) => {
  throw new Error('kaboom');
});

ee.on('error', console.log);

ee.emit('something');

const ee1 = new EventEmitter({ captureRejections: true });
ee1.on('something', async (value) => {
  throw new Error('kaboom');
});

ee1[captureRejectionSymbol] = console.log;
// ee1[Symbol.for('nodejs.rejection')] = console.log;

ee1.emit('something');

class PromiseEventEmitter extends EventEmitter {
    constructor() {
        super({ captureRejections: true })
    }

    [captureRejectionSymbol](err,event,...args) {
        console.log('rejection happened for', event, 'with', err, ...args);
        // this.destroy(err);
    }
}

const ee2 = new PromiseEventEmitter({ captureRejections: true });
ee2.on('something', async (value) => {
  throw new Error('kaboom');
});

ee2.emit('something');