// Setup router with new router object, import db
const express = require('express');
const router = express.Router();
const db = require('../db');

// create professors endpoint for testing and build
router.get('/', async (req, res) => {
    try {
        const searchTerm = req.query.search;
        let query;
        let params = []; // can be empty

        if (typeof searchTerm !== 'undefined') {
            // if search exists, find it in the table
            query = 'SELECT * FROM professors WHERE department ILIKE $1 OR name ILIKE $1 OR research_area ILIKE $1 ORDER BY id';
            params = [`%${searchTerm}%`];
        } else {
            // if not, no need to filter.
            query = 'SELECT * FROM professors ORDER BY id';
            // params[] is empty.
        }
        const result = await db.query(query, params);
        res.json(result.rows);
    } catch (err) {
        // TODO: either switch to global error handling or display gracefully + prettily for the user
        console.error('Error fetching professors:', err.message);
        res.status(500).json({error: "Failed to fetch professors" });
    }
});

// export the router
module.exports = router;