
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel")


// Get notes
// @route /api/tickets/:ticketId/notes
// @access true (Private)
// GET
const getNotes = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        let err = new Error("Could not find this user");
        res.status(401).json({
            message: err.message,
            stack: err.stack,
        });
    }
    if (user) {
        const ticket = await Ticket.findById(req.params.ticketId);
        if (ticket.user.toString() !== req.user.id) {
            let err = new Error("User not authorized");
            res.status(401).json({
                message: err.message,
                stack: err.stack,
            });
        }
        const notes = await Note.find({ticket: req.params.ticketId})
        res.status(201).json(notes);
    }
});


// Create notes
// @route /api/tickets/:ticketId/notes
// @access true (Private)
// POST
const addNote = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        let err = new Error("Could not find this user");
        res.status(401).json({
            message: err.message,
            stack: err.stack,
        });
    }
    if (user) {
        const ticket = await Ticket.findById(req.params.ticketId);
        if (ticket.user.toString() !== req.user.id) {
            let err = new Error("User not authorized");
            res.status(401).json({
                message: err.message,
                stack: err.stack,
            });
        }
        const note = await Note.create({
            text: req.body.note,
            ticket: req.params.ticketId,
            user: req.user.id,
            isStaff: false,
        })
        res.status(201).json(note);
    }
});


module.exports = {
    getNotes,
    addNote,
}