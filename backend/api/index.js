const connectToMongo = require("../db");
const express = require('express');
var cors = require('cors')

connectToMongo();

const app = express();

app.use(express.json()); //Need this for using request body in json format
app.use(cors()); //Acts middleware to resolve CORS issue

// Routes
app.get('/', (req, res) => {
    res.send("Connected to Server"); // Corrected: added req, res arguments
});

app.use('/api/auth', require("../routes/auth"));
app.use('/api/notes', require("../routes/notes"));

// Export the handler for Vercel
module.exports = app;