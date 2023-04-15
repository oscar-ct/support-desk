const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require("./middleware/errorMiddleware")

const PORT = process.env.PORT || 6000;

const app = express();

// middleware
app.use(express.json()); // body parser
app.use(express.urlencoded({extended: false}));
app.use(errorHandler);



app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the Support Desk API"});
});


app.use("/api/users", require("./routes/userFiles"))



app.listen(6000, 'localhost', () => {
    console.log('working');
    console.log(`Server started on port ${PORT}`);
});


