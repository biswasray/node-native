const {isPrime: isPrimeNonBlock} = require("./prime_non_block.cjs");
// const {isPrime: isPrimeBlock} = require("./prime_block.cjs");
// const {isPrime: isPrimeBlock} = require("./prime_timeout.cjs");

// run();
isPrimeNonBlock(4567).then((data)=>console.log(4567,data)).catch(console.log);
isPrimeNonBlock(4).then((data)=>console.log(4,data)).catch(console.log);

// isPrimeBlock(4567).then((data)=>console.log(4567,data)).catch(console.log);
// isPrimeBlock(4).then((data)=>console.log(4,data)).catch(console.log);
console.log("On main thread");