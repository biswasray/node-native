import { createPool } from "./lib.mjs";

function fun() {
    return "ghjk";
  }
  function hello() {
    const d = fun();
    return d + 9;
  }
  const run = createPool(fun);
  run().then(console.log).catch(console.log);
