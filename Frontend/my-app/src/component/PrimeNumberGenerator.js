import React, { useState } from 'react';
import axios from 'axios';
import "./style.css";

// Error component to display errors
const Error = ({ message }) => {
  return <p style={{ color: 'red' }}>{message}</p>;
};

const PrimeNumberViewer = () => {

  const [startNumber, setStartNumber] = useState('');
  const [endNumber, setEndNumber] = useState('');
  const [strategy, setStrategy] = useState('naive'); // Default strategy is naive
  const [primeNumbers, setPrimeNumbers] = useState([]);
  const [error, setError] = useState(null);

  // Handler for start number input change
  const handleStartInputChange = (e) => {
    setStartNumber(e.target.value);

  };

  // Handler for end number input change
  const handleEndInputChange = (e) => {
    setEndNumber(e.target.value);
  };

  // Handler for strategy select change
  const handleStrategyChange = (e) => {
    setStrategy(e.target.value);
  };

  // Function to fetch prime numbers from backend
  const fetchPrimeNumbers = async () => {
    try {
      // Convert input values to integers
      const start = parseInt(startNumber);
      const end = parseInt(endNumber);
      
      // Validation for numeric inputs
      if (isNaN(start) || isNaN(end)) {
        setError('Please enter valid numbers.');
        return;
      }
  
      // Make API request with valid input values and selected strategy
      const response = await axios.get('http://localhost:3000/api/generate-primes', {
        params: {
          start,
          end,
          strategy // Include selected strategy in the request
        },
        withCredentials: true // Include credentials in the request
      });
      console.log('Response:', response); 
  
      // Set prime numbers and clear error state
      setPrimeNumbers(response.data.primes);
      setError(null);
      console.log(response.data.primes);
    } catch (error) {
      console.error('Error generating prime numbers:', error);
      setError('Failed to generate prime numbers. Please try again later.');
    }
  };
  

  return (
    <div>
      <h2>Prime Number Viewer</h2>
      {error && <Error message={error} />}
      <div>
        <label>Start Number: </label>
        <input
          type="number"
          value={startNumber}
          onChange={handleStartInputChange}
        />
      </div>
      <div>
        <label>End Number: </label>
        <input
          type="number"
          value={endNumber}
          onChange={handleEndInputChange}
        />
      </div>
      <div>
        <label>Select Strategy: </label>
        <select value={strategy} onChange={handleStrategyChange}>
          <option value="naive">Naive</option>
          <option value="sieve">Sieve</option>
        </select>
      </div>
      <button onClick={fetchPrimeNumbers}>Fetch Prime Numbers</button>
      <h3>Prime Numbers:</h3>
      <ul>
        {primeNumbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
};

export default PrimeNumberViewer;