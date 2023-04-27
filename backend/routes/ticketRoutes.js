
const express = require("express");
const router = express.Router();
const {getTickets, createTicket, getTicket, deleteTicket, updateTicket} = require("../routes/ticketController");

const {protect} = require("../middleware/authMiddleware");



// this will be merging params from ticket id with notes
const noteRouter = require("./notesRoutes");
router.use("/:ticketId/notes", noteRouter);



router.route("/").get(protect, getTickets).post(protect, createTicket);

router.route("/:id").get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket);

module.exports = router;