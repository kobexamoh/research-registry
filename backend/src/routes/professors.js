// Setup router with new router object, import db
const express = require('express');
const router = express.Router();
const db = require('../db');

// create professors endpoint for testing and build
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM professors ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        // TODO: either switch to global error handling or display gracefully + prettily for the user
        console.error('Error fetching professors:', err.message);
        res.status(500).json({error: "Failed to fetch professors" });
    }
});

// export the router
module.exports = router;