const express = require('express');
const router = express.Router();
const db = require('../db');

// create interest endpoint
router.post('/', async (req, res) => {
    const { student_name, student_email, student_program, message, professor_id} = req.body;

    // initial validation - TODO: change to Joi for Phase 2
    if (!student_name || !student_email || !professor_id) {
        return res.status(400).json({ error: 'student_name, student_email, and professor_id are required' });
    }

    try {
        const result = await db.query(
            `INSERT INTO expressions_of_interest
            (student_name, student_email, student_program, message, professor_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id`,
            [student_name, student_email, student_program, message, professor_id]
        );

        res.status(201).json({
            message: 'Expression of interest submitted successfully',
            id: result.rows[0].id
        });
    } catch (err) {
        res.status(500).json({error: 'Failed to submit epxression of interest'});
    }
});

module.exports = router;