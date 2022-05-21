const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHanlder = require('express-async-handler');
const User = require('../models/userModel');
const { body, validationResult } = require('express-validator');

// Authenticate a new user 
const registerUser = asyncHanlder(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields!");
    }
    // check if the user already exists in the db
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        res.status(400);
        throw new Error("User already exists !");
    }
    // make sure the email is valid and the len(passwd) > 6
    if (body('email').isEmail() && body('password').isLength({ min: 6 })) {
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create the user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        if (newUser) {
            res.status(201).json({ message: "New user created !", _id: newUser._id, name: newUser.name, email: newUser.email, token: generateToken() });
        } else {
            res.status(400);
            throw new Error("Invalid user data !");
        }
    }
    res.json({ message: "Registered new user !" })
});

const loginUser = asyncHanlder(async (req, res) => {
    const { email, password } = req.body;

    // the email is unique
    const user = await User.findOne({ email });

    // check the password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid credentials!");
    }
});

const getMe = asyncHanlder(async (req, res) => {
    res.json({ message: "User profile" })
});

// generate a json web token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};