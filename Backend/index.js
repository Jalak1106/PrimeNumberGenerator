const http=require('http');
const express = require('express');
const app=require('./app');

app.use(express.urlencoded({ extended: true }));

//create server
const server=http.createServer(app);

//listen server
server.listen(3000,()=>{    
    console.log(`Server is running on port 3000`);
});