
function isPrimeNaive(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}
function isPrimeSieve(num) {
    if (num <= 1) return false;

    // Create an array to track prime numbers
    const primes = new Array(num + 1).fill(true);
    primes[0] = primes[1] = false;

    // Use Sieve of Eratosthenes algorithm to mark non-prime numbers
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (primes[i]) {
            for (let j = i * i; j <= num; j += i) {
                primes[j] = false;
            }
        }
    }
    return primes[num];
}

module.exports = { isPrimeNaive, isPrimeSieve };
