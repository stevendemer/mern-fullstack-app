const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (err, req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1];
            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //get user from the token and not the hashed password
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (err) {
            console.log(err);
            res.status(401); // not authorized
            throw new Error('Not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized !\nNo token found !');
    }
});

module.exports = protect;