// Load environment variables and imports as needed
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const profs = require('./routes/professors')

// Initialize instance of Express app and port
const app = express();
const PORT = process.env.PORT || 3000; // TODO: add this line to learning file for review

// Set up middleware
app.use(cors());
app.use(express.json());

// Health check route (for testing)
app.get('/health', (req, res) => {
    console.log("A GET request has hit the service");
    res.send("A GET request has hit the server: this is the server response showing in the browser");
});

// mount the router for professors
app.use('/professors', profs);

// Begin the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});