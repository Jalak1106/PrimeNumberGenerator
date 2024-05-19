
const mongoose = require('mongoose');

// Define schema for prime numbers
const PrimeNumberSchema = new mongoose.Schema({
    start: {
        type: Number,
        required: true
    },
    end: {
        type: Number,
        required: true
    },
    strategy: {
        type: String,
        required: true
    },
    output: {
        type: [Number],
        required: true
    }
}, { timestamps: true });

// Create a model for prime numbers
const PrimeNumber = mongoose.model('PrimeNumber', PrimeNumberSchema);

module.exports = PrimeNumber;
