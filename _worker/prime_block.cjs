function isPrime(num) {
    return new Promise((resolve,reject)=>{
        if(num<2) {
            return resolve(false);
        }
        let i, flag = true;
        for (i = 2; i <= num - 1; i++) {
            if (num % i == 0) {
                flag = false;
                break;
            }
        }
        return resolve(flag);
    });
}

module.exports = {
    isPrime
}