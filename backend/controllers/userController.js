
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECERT, {expiresIn: "30d"});
}



// These functions are used to clean up routes @ userFiles

// @route /api/users
// @access false
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    // validation
    if (!name || !email || !password) {
        let err = new Error("Please include all fields");
        res.status(401).json({
            message: err.message,
            stack: err.stack,
        });
    } else {
        const userExists = await User.findOne({email: email});
        if (userExists) {
            let err = new Error("Email already exists");
            res.status(401).json({
                message: err.message,
                stack: err.stack,
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            });
            if(user) {
                return res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                });
            } else {
                let err = new Error("Invalid user data!!");
                res.status(401).json({
                    message: err.message,
                    stack: err.stack,
                });
            }
        }
    }
});




// @route /api/users/login
// @access false
const loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        let err = new Error("Invalid email or password");
        res.status(401).json({
            message: err.message,
            stack: err.stack,
        });
    }
});




// @route /api/users/me
// @access true (Private)
const getMe = asyncHandler( async(req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.status(200).json(user);
});

module.exports = {
    registerUser,
    loginUser,
    getMe
}