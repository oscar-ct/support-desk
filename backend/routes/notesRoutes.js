const express = require("express");
const router = express.Router({mergeParams: true});
const {getNotes, addNote} = require("../routes/noteController");
const {protect} = require("../middleware/authMiddleware");


router.route("/").get(protect, getNotes).post(protect, addNote);

module.exports = router;