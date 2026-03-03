// Load environment variables and imports as needed
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const professorsRouter = require('./routes/professors');
const interestsRouter = require('./routes/interest');

// Initialize instance of Express app and port
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(cors());
app.use(express.json());

// Health check route (for testing)
app.get('/health', (req, res) => {
    console.log("A GET request has hit the service");
    res.send("A GET request has hit the server: this is the server response showing in the browser");
});

// mount the router for professors and interests
app.use('/professors', professorsRouter);
app.use('/interest', interestsRouter);

// Begin the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});