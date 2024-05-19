const express = require('express');
const router = express.Router();
const { generatePrimeNumbers } = require('../controller/index');

const isPrime = (num) => {
    if (num <= 1) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  };
  
  router.get('/generate-primes', async (req, res) => {
    try {
      const { start, end, strategy} = req.query;
      if (!start || !end || !strategy) {
        return res.status(400).json({ error: 'Missing required parameters: start, end, and strategy.' });
    }
      
      // Generate prime numbers within the specified range
      const primes = [];
        for (let num = start; num <= end; num++) {
            if (isPrime(num)) {
                primes.push(num);
            }
        }
      res.json({ primes });
    } catch (error) {
      console.error('Error generating prime numbers:', error);
      res.status(500).json({ error: 'Failed to generate prime numbers. Please try again later.' });
    }
  });


router.post('/generate-primes', generatePrimeNumbers);
// router.get('/generate-primes', generatePrimeNumbers);
module.exports = router;
