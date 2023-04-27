const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../controllers/userController")


// This is a cleaner way of setting up routes
// new way
router.post("/", registerUser);

// old way
// router.post("/", (req, res) => {
//     res.send("Register Route");
// });

const {protect} = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.get("/me", protect, getMe);  /// protected route
module.exports = router;