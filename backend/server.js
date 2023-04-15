const express = require('express');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 6000;

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the Support Desk API"});
});


app.use("/api/users", require("./routes/userFiles"))

app.listen(6000, 'localhost', () => {
    console.log('working');
    console.log(`Server started on port ${PORT}`);
});


