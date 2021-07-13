const express = require('express');

const app = express();

const router = express.Router();

const authRouter = require('./routes/auth')

const mongoose = require('mongoose');

const MONGODB_URL = 'mongodb://localhost:27017/shipme';

app.use(express.json()) // parse incoming requests to JSON

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    next();
}); //Cross Origin configurations

app.use('/auth',authRouter);

app.use((error,req,res,next)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data
    console.log(error);
    res.status(status).json({message:message,data: data});
})

mongoose.connect(MONGODB_URL,
    { useNewUrlParser: true,
    useUnifiedTopology:true 
})
.then(result =>{
    app.listen(8080);
})
.catch(error => console.log(error));