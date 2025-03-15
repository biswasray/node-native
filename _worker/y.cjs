const {Worker} = require("worker_threads");
class Dog {
    constructor() {
        this.leg = 4
    }
}
const dog = new Dog();
// console.log(dog);
// const circularData = {};
// circularData.foo = circularData;
const worker = new Worker("./x.cjs");
worker.postMessage(dog,[dog]);