const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


const protect = asyncHandler(async (req, res, next) => {
   let token
   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
       try {
           token = req.headers.authorization.split(" ")[1];
           const decoded = jwt.verify(token, process.env.JWT_SECERT);
           req.user = await User.findById(decoded.id).select("-password");
           next();
       } catch (e) {
            console.log(e);
            res.status(401);
            throw new Error("Not authorized");
       }
   }
   if(!token) {
       res.status(401);
       throw new Error("Not authorized");
   }
});

module.exports = {
    protect
}