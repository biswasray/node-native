const {serialize,deserialize} = require("v8");
require("./a.cjs");
class Dog {
    constructor() {
        this.leg=4;
    }
    run() {
        return "running"
    }
}

const d=new Dog();
console.log(a);
const y=serialize(d);
// console.log(deserialize(y).run());