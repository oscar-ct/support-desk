
const express = require("express");
const router = express.Router();
const {getTickets, createTicket, getTicket} = require("../routes/ticketController");


const {protect} = require("../middleware/authMiddleware");
const {deleteTicket, updateTicket} = require("./ticketController");



router.route("/").get(protect, getTickets).post(protect, createTicket);

router.route("/:id").get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket);

module.exports = router;