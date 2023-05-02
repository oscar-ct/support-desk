const express = require('express');
const colors = require("colors");
const dotenv = require('dotenv').config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const path = require("path");



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


/// Serve Frontend
if (process.env.NODE_ENV === "production") {
    /// set build folder as static
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    /// loading html page from build folder
    app.get("*", (req, res) => res.sendFile(__dirname, "../", "frontend", "build", "index.html"));
} else {
    app.get('/', (req, res) => {
        res.status(200).json({message: "Welcome to the Support Desk API"});
    });

}


//// add to package json
// "heroku-postbuild" : "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"





app.listen(PORT, 'localhost', () => {
    console.log('working');
    console.log(`Server started on port ${PORT}`);
});


