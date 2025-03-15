const {wrap} = require("./wrap");

function _isPrime(num) {
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

const isPrime = wrap(_isPrime);

isPrime(288).then(console.log).catch(console.log);