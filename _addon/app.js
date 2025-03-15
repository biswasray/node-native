// Require addons 
const calculate = require('../build/Release/calculate'); 

// Javascript add function. 
function calc() { 

	// Two variables. 
	let i, x = 3.141526, y = 2.718; 
	for (i = 0; i < 1000000000; i++) { 
		x += y; 

	} 
	let total = x; 
	return total; 
}

console.time('c++'); 
calculate.calc(); 
console.timeEnd('c++'); 

console.time('js'); 
calc(); 

console.timeEnd('js');
