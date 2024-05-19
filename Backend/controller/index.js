const PrimeNumber = require('../model/index'); 
const { isPrimeNaive, isPrimeSieve } = require('../controller/isPrime');

async function generatePrimeNumbers(req, res) {
    const { start, end, strategy } = req.body;

    let num1=parseInt(start);
    let num2=parseInt(end);
    if (!start || !end || !strategy) {
        return res.status(400).json({ error: 'Missing required parameters: start, end, and strategy.' });
    }
    if(isNaN(num1 || num2)){
        return res.status(400).json({ error: 'Please enter valid numbers.' });  
    }

    try {
        let isPrime;
        if (strategy === "naive") {
            isPrime = isPrimeNaive;
        } else if (strategy === "sieve") {
            isPrime = isPrimeSieve;
        } else {
            return res.status(400).json({ error: 'Invalid strategy' });
        }

        const primes = [];
        for (let num = start; num <= end; num++) {
          
            if (isPrime(num)) {
                primes.push(num);
            }
        }
        // const primes = [];
        // if(isPrimeNaive(num)){
        //     primes.push(num);
        // }else if(isPrimeSieve(num)){
        //     primes.push(num);
        // }
        // Save execution details to the database
        const executionDetails = new PrimeNumber({
            start,
            end,
            strategy,
            output: primes
            
        });
        await executionDetails.save();
        
        console.log(req.body, primes);
        return res.json({ primes });
        
    } catch (error) {
        // console.error('Error generating prime numbers:', error);
        return res.status(500).json({ error: 'Failed to generate prime numbers.' });
    }
}

module.exports = { generatePrimeNumbers };
