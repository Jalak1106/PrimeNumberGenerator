const express=require("express");
const bodyParser=require("body-parser");
const connectMongodb=require("./init/mongodb");
const routes = require('./router/index');
const cors = require('cors');

// dotenv.config();

//init app
const app=express();

//connect database
connectMongodb();

// Allow requests from all origins with credentials
app.use(cors({
    origin: true,
    credentials: true
  }));//not used in this project
//third-party middleware
app.use(express.json({limit:"500mb"}));
app.use(bodyParser.urlencoded({limit:"500mb",extended:true}));
app.use('/api', routes)
module.exports=app;