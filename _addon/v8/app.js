// app.js
const calculator = require('./build/Release/calculator');

const sum = calculator.sum(2, 8);
console.log(`Sum: ${sum}`);

const subtract = calculator.subtract(10, 4);
console.log(`Subtract: ${subtract}`);
