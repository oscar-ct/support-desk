
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
    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please include all fields")
    } else {
        const userExists = await User.findOne({email: email});
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
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
                res.status(400);
                throw new Error("Invalid user data")
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
        res.status(401);
        throw new Error("Invalid email/password");
    }
});

module.exports = {
    registerUser,
    loginUser
}