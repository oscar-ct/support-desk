
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");



// @route /api/tickets
// @access true (Private)
// GET
const getTickets = asyncHandler( async(req, res) => {
    const ticket = {
        test: "getTickets"
    }
    res.status(200).json(ticket);
});


// @route /api/tickets
// @access true (Private)
// POST
const createTicket = asyncHandler( async(req, res) => {
    const ticket = {
        test: "createTicket"
    }
    res.status(200).json(ticket);
});





module.exports = {
    getTickets,
    createTicket,
}