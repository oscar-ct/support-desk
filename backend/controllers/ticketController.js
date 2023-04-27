
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");


let userErr = new Error("Could not find user");


// @route /api/tickets
// @access true (Private)
// GET
const getTickets = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        const tickets = await Ticket.find({user: req.user.id});
        res.status(201).json(tickets);
    } else if (!user){
        res.status(401).json({
            message: userErr.message,
            stack: userErr.stack,
        });
    }
});



// @route /api/tickets:id
// @access true (Private)
// GET
const getTicket = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        const ticket = await Ticket.findById(req.params.id);
        if (ticket?.user.toString() !== req.user.id) {
            let err = new Error("Not authorized");
            res.status(401).json({
                message: err.message,
                stack: err.stack,
            });
        }
        if (!ticket) {
            let err = new Error("Could not find ticket");
            res.status(401).json({
                message: err.message,
                stack: err.stack,
            });
        }
        res.status(201).json(ticket);
    } else if (!user){
        res.status(401).json({
            message: userErr.message,
            stack: userErr.stack,
        });
    }
});




// @route /api/tickets/:id
// @access true (Private)
// DELETE
const deleteTicket = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        const ticket = await Ticket.findById(req.params.id);
        if (ticket?.user.toString() !== req.user.id) {
            let err = new Error("Not authorized");
            res.status(401).json({
                message: err.message,
                stack: err.stack,
            });
        } else {
            await Ticket.findByIdAndDelete(req.params.id);
            res.status(201).json({message: "Ticket has been successfully deleted"});
        }
        if (!ticket) {
            let err = new Error("Could not find ticket");
            res.status(401).json({
                message: err.message,
                stack: err.stack,
            });
        }
        res.status(201).json(ticket);
    } else if (!user){
        res.status(401).json({
            message: userErr.message,
            stack: userErr.stack,
        });
    }
});





// @route /api/tickets/:id
// @access true (Private)
// PUT
const updateTicket = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        const ticket = await Ticket.findById(req.params.id);
        if (ticket?.user.toString() !== req.user.id) {
            let err = new Error("Not authorized");
            res.status(401).json({
                message: err.message,
                stack: err.stack,
            });
        } else {
            const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(201).json(updatedTicket);
        }
        if (!ticket) {
            let err = new Error("Could not find ticket");
            res.status(401).json({
                message: err.message,
                stack: err.stack,
            });
        }
        res.status(201).json(ticket);
    } else if (!user){
        res.status(401).json({
            message: userErr.message,
            stack: userErr.stack,
        });
    }
});




// @route /api/tickets
// @access true (Private)
// POST
const createTicket = asyncHandler( async(req, res) => {
    const {product, description} = req.body;
    const user = await User.findById(req.user.id);
    if (!product || !description) {
        let err = new Error("Please add a product and description");
        res.status(401).json({
            message: err.message,
            stack: err.stack,
        });
    }
    if (!user) {
        res.status(401).json({
            message: userErr.message,
            stack: userErr.stack,
        });
    }
    if (product && description && user) {
        const ticket = await Ticket.create({
            product,
            description,
            user: req.user.id,
            status: "new",
        });
        res.status(201).json(ticket);
    }
});





module.exports = {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket,
}