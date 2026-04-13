// Setup router with new router object, import db
const express = require('express');
const router = express.Router();
const db = require('../db');

// create professors endpoint for testing and build
router.get('/', async (req, res) => {
    try {
        // TODO: refactor try block to avoid code duplication...
        const searchTerm = req.query.search;
        if (typeof searchTerm !== 'undefined') {
            // that is, it exists so filter it:
            const result = await db.query('SELECT * FROM professors WHERE department ILIKE $1 OR name ILIKE $1 OR research_area ILIKE $1 ORDER BY id', [`%${searchTerm}%`]);
            res.json(result.rows);
        } else {
            // that is, it doesn't exist, so don't filter it
            const result = await db.query('SELECT * FROM professors ORDER BY id');
            res.json(result.rows);
        }
    } catch (err) {
        // TODO: either switch to global error handling or display gracefully + prettily for the user
        console.error('Error fetching professors:', err.message);
        res.status(500).json({error: "Failed to fetch professors" });
    }
});

// export the router
module.exports = router;