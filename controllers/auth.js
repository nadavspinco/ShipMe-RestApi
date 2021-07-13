const User = require('../models/user.js');

const {validationResult} = require('express-validator')

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const  {handleErrors} = require('./error.js');



const createToken = (email,userId) => {
    
    return jwt.sign({
        email: user.email,
        userId: userId.toString(),
    },'somekeyfromivtech',{expiresIn: '1m'})
}


exports.isEmailExist = (req,res,next) =>{
    handleErrors(req);
    const {email} = req.body;
    User.findOne({email:email}).then(result=>{
        if(result){
            res.json({message:"email already exist",isEmailExist:true})
            return;
        }
        res.json({message:"email not exist",isEmailExist:false})
    }).catch(error => {
        console,log(error);
        res.json({message: "error"})})

}

exports.signup = (req,res,next) => {
    handleErrors(req,402);
    const {email,firstName,lastName,password} = req.body;
    let user;
    bcrypt
    .hash(password,12)
    .then(hashrdPassword=>{
         user = new User({
            email: email,
            password: hashrdPassword,
            firstName: firstName,
            lastName: lastName
        })
        return user.save();
    }
    ).then(result =>{
        const token = jwt.sign({
            email: email,
            userId: user._id.toString(),
        },'somekeyfromivtech',{expiresIn: '1m'})
        
        res.status(201).json({message: 'User Created', userId: result._id,jwt: token  });
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({message: 
            'user is not created'});
    }
)


};

exports.login = (req,res,next) =>{
    handleErrors(req,402);
    const {email,password} = req.body;
    let user;
    User.findOne({email: email})
    .then(result => {
        if(result){
            user = result;
             return bcrypt.compare(password,user.password)
        }
        throw new Error('Login Failed')
    })
    .then(result => {
     
        if(result){
           const token = jwt.sign({
            email: user.email,
            userId: user._id.toString(),
        },'somekeyfromivtech',{expiresIn: '1m'})
            res.json({message: 'Login succeus', user:user,jwt: token  })
            return;
        }
        res.status(403).json({message: 'incorrect password or email'});
    }).catch((error) => {
        res.status(500).json({
            message: 'Login Failed',
        })
    })

}




