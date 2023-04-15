
const asyncHandler = require("express-async-handler");


// These functions are used to clean up routes @ userFiles

// @route /api/users
// @access false
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    // validation
    if(!name || email || password) {
        res.status(400);
        throw new Error("Please include all fields")
    }
    res.send("Register Route")
});




// @route /api/users/login
// @access false
const loginUser = asyncHandler( async(req, res) => {
    res.send("Login Route")
})

module.exports = {
    registerUser,
    loginUser
}