const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUserId = require('../middleware/getUserIdJWT');
require('dotenv').config(); //Load environment variables from .env file

// ROUTE: Creating a user using POST "/api/auth/createuser".
router.post('/createuser', [
    //Adding Validations
    body('username', 'Username cannot be empty').notEmpty(),
    body('email', 'Please enter a valid email address').isEmail(),
    body('password', 'Password length must be atleast 5 character long').isLength({ min: 5 }),

],async (req,res)=>{
    //Check if the validation returns an error
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json({ status: false, message: error.array() });
    }

    try{
        //Check if the username or email already exists
        let user = await User.findOne({$or:[{"username": req.body.username},{"email": req.body.email }]});
        if(user){
            return res.json({ status: false, message: "User with same username or email already exists" });
        }

        //Hashing the entered password
        var salt = await bcrypt.genSalt(10);
        var hashedPass = await bcrypt.hash(req.body.password, salt)

        //Creating User
        user = await User.create({
            "username": req.body.username,
            "email": req.body.email,
            "password": hashedPass
        });

        //Sending JWT token on successfully creating the user
        var data = { userId: user.id };
        
        var authtoken = jwt.sign(data, process.env.JWT_SECRET);
        return res.json({status: true, authtoken});
        
    }catch(err){
        return res.json({status: false, "message": "Internal server error", "error": err.message});
    }
})

// ROUTE: Authenticate a user using POST "/api/auth/login".
router.post('/login', [
    //Adding Validations
    body('username', 'Username cannot be blank').notEmpty(),
    body('password', 'Password cannot be blank').notEmpty(),
],async (req,res)=>{

    //Check if the validation returns an error
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() });
    }

    // Destructing from request body
    const {username, password} = req.body;

    // Checking if user exists
    try {
        var user = await User.findOne({username});
        if(!user){
            return res.json({status: false, message: "Incorrect credentials"});
        }

        var checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.json({status:false, message: "Incorrect credentials"});
        }

        var data = {userId: user.id};
        var authtoken = jwt.sign(data, process.env.JWT_SECRET);
        return res.json({status: true, authtoken});
    } catch (err) {
        return res.json({status: false, "message": "Internal server error", "error": err.message});
    }
});

// ROUTE: Getting logged in user details using JWT token
router.get('/getUserDetail', getUserId, async (req,res)=>{

    //Using middleware to modify the request of the endpoint
    var userId = req.userId;
    const user = await User.findById(userId).select("-password");
    res.json({user});
});

module.exports = router