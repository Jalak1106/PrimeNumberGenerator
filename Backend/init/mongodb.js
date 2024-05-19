const mongoose = require('mongoose');

const connectMongodb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/primeno");
        console.log("Connected to mongoDb");
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = connectMongodb;