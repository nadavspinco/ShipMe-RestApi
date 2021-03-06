const express = require('express');

const controller = require('../controllers/auth');

const {body} = require('express-validator/check')

const router = express.Router();

const  {validatePassword} =require('../utils/validation');

const User = require('../models/user.js');

router.post('/signup',[body('email')
.isEmail().
withMessage("Please enter a valid email")
.custom((value, {req})=>{
    return User.findOne({email: value}).then(userDoc =>{
        if(userDoc){
            return Promise.reject('Email already exists')
        }
    })
})
.normalizeEmail(),
body('password')
.trim()
.isLength({min: 8})
.withMessage("The password should contains at least one capital letter, one special sign and one number, the length of the password should be 8 symbols")
.custom((value, {req}) =>{
    return validatePassword(value);
}),
body('firstName')
.trim()
.not()
.isEmpty(),
body('lastName')
.trim()
.not()
.isEmpty()
],controller.signup)

router.post('/login',controller.login)

router.post('/isEmailExist',[body('email')
.isEmail().
withMessage("Please enter a valid email")
.normalizeEmail()],controller.isEmailExist)



module.exports = router;