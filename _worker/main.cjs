const {isPrime: isPrimeNonBlock} = require("./prime_non_block.cjs");
// const {isPrime: isPrimeBlock} = require("./prime_block.cjs");
// const {isPrime: isPrimeBlock} = require("./prime_timeout.cjs");

// run();
const controller = new AbortController();
isPrimeNonBlock(100003,{signal: controller.signal}).then((data)=>console.log(100003,data)).catch((err)=>{
    console.log("handled",err)
});
isPrimeNonBlock(936868033).then((data)=>console.log(936868033,data)).catch(console.log);
isPrimeNonBlock(4).then((data)=>console.log(4,data)).catch(console.log);
controller.abort();
// isPrimeBlock(4567).then((data)=>console.log(4567,data)).catch(console.log);
// isPrimeBlock(4).then((data)=>console.log(4,data)).catch(console.log);
console.log("On main thread");

/*

2367949 (16 ms)
43686389 (200 ms)
93686687 (500 ms)
936868033(4 seconds)
29355126551 (very long time)

*/