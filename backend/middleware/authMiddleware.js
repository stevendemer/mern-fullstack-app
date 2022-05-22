const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { deleteOne } = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    const authorization = req.get('authorization');
    let token;

    if (
        authorization &&
        authorization.startsWith('Bearer')
    ) {
        try {
            let parts = authorization.split('.');
            if (parts.length !== 3) {
                return res.status(500).json({ message: "JWT Malformed" });
            }
            // get token from header
            token = authorization.split(' ')[1];
            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //get user from the token and not the hashed password
            req.user = await User.findById(decoded.id).select('-password');

            next(); // calling the next middleware or handler
        } catch (err) {
            console.log(err);
            res.status(401); // not authorized
            throw new Error('Not authorized');
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized!" });
    }
});

module.exports = { protect };