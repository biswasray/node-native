function wrap(cls) {
	// Get all static method names
	const staticMethodNames = Object.getOwnPropertyNames(cls).filter((name) => {
		const descriptor = Object.getOwnPropertyDescriptor(cls, name);
		console.log(name,typeof descriptor.value);
		return descriptor.writable;
	});

	// Get all static methods
	const staticMethods = {};
	staticMethodNames.forEach((name) => {
		staticMethods[name] = cls[name];
	});
	return staticMethods;
}

const _demoService = {
    props: {},
    async fun() {
		return "nxwnxw";
	},
	async run(parm) {
		return {
			some: parm,
		};
	},
}

class DemoService {
    props= {};
	static isPrime(num) {
		if(typeof num !=="number" || isNaN(num)) {
			throw new Error("Invalid input")
		}
		if(num<2) {
			return false;
		}
		let i, flag = true;
		for (i = 2; i <= num - 1; i++) {
			if (num % i == 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
}

console.log(wrap(DemoService));

// const hh = Object.getOwnPropertyNames(DemoService);
// hh.map(h=>{
//     const pd=Object.getOwnPropertyDescriptor(DemoService,h);
//    console.log(pd.value);
// })
// console.log(hh);
