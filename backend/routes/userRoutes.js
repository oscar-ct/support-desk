const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../routes/userController")


// This is a cleaner way of setting up routes
// new way
router.post("/", registerUser);

// old way
// router.post("/", (req, res) => {
//     res.send("Register Route");
// });

router.post("/login", loginUser);
router.get("/me", getMe);
module.exports = router;