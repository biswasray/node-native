import process from 'node:process';

process.on('multipleResolves', (type, promise, reason) => {
  console.error(type, promise, reason);
  setImmediate(() => process.exit(1));
});

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason);
  console.log('unhandledRejection',unhandledRejections);
});
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise);
  console.log('rejectionHandled',unhandledRejections);
});

async function main() {
  try {
    return await new Promise((resolve, reject) => {
      resolve('First call');
      resolve('Swallowed resolve');
      reject(new Error('Swallowed reject'));
    });
  } catch {
    throw new Error('Failed');
  }
}

async function fun() {
  return new Promise((resolve, reject) => {
    reject(new Error('Failed'));
  });
}

main().then(console.log);
fun().catch(console.error);
// resolve: Promise { 'First call' } 'Swallowed resolve'
// reject: Promise { 'First call' } Error: Swallowed reject
//     at Promise (*)
//     at new Promise (<anonymous>)
//     at main (*)
// First call