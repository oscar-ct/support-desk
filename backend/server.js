const express = require('express');
const colors = require("colors");
const dotenv = require('dotenv').config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");



const PORT = process.env.PORT || 6000;


// Database connection
connectDB();

const app = express();

// middleware
app.use(errorHandler);
app.use(express.json()); // body parser
app.use(express.urlencoded({extended: false}));

/// ROUTE: http://localhost:/XXXX/api/users
app.use("/api/users", require("./routes/userRoutes"));


/// ROUTE: http://localhost:/XXXX/api/tickets
app.use("/api/tickets", require("./routes/ticketRoutes"));



app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the Support Desk API"});
});


app.listen(5000, 'localhost', () => {
    console.log('working');
    console.log(`Server started on port 5000`);
});


