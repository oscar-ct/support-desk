const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        ticket: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Ticket"
        },
        note: {
            type: String,
            required: [true, "Please enter a a note"],
        },
        isStaff: {
            type: Boolean,
            default: false,
        },
    /// Later to br User Id
        staffId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Note", noteSchema);