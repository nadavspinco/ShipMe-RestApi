const express = require('express');

const app = express();

const router = express.Router();

const mongoose = require('mongoose');

const MONGODB_URL = 'mongodb://localhost:27017/shipme';

app.use(express.json()) // parse incoming requests to JSON

mongoose.connect(MONGODB_URL,
    { useNewUrlParser: true,
    useUnifiedTopology:true 
})
.then(result =>{
    app.listen(8080);
})
.catch(error => console.log(error));