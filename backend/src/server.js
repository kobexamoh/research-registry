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

// Set up middleware; begin using CORS and JSON parsing for incoming requests
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? 'https://research-registry.vercel.app'
        : 'http://localhost:5173',
        optionsSuccessStatus: 200
}; // Adjust CORS options based on environment (production vs development)
app.use(cors(corsOptions));
app.use(express.json());

// Health check route (for testing)
app.get('/health', (req, res) => {
    console.log("A GET request has hit the service");
    res.send("A GET request has hit the server: this is the server response showing in the browser");
});

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Research Registry API! Use /professors to get the list of professors and /interest to submit your interest in working with a professor.",
        name: 'Research Registry API',
        endpoints: ['/professors', '/interest', '/health']
    });
});

// mount the router for professors and interests
app.use('/professors', professorsRouter);
app.use('/interest', interestsRouter);

// Begin the server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} // Export app for testing purposes

module.exports = app;