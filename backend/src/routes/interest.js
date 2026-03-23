const express = require('express');
const router = express.Router();
const db = require('../db');
const interestSchema = require('../validators/interestSchema'); // import the Joi validation schema

// create interest endpoint
router.post('/', async (req, res) => {
    // Validate the request body againss the Joi schema
    const { error, value } = interestSchema.validate(req.body, { abortEarly: false }); // check data against all rules and return all errors, if any.

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ error: errorMessages.join(', ') });
    }

    // Use validated data
    const { student_name, student_email, student_program, message, professor_id} = value;

    try {
        const result = await db.query(
            `INSERT INTO expressions_of_interest
            (student_name, student_email, student_program, message, professor_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id`,
            [student_name, student_email, student_program, message, professor_id]
        );

        res.status(201).json({
            message: 'Expression of interest was submitted successfully.',
            id: result.rows[0].id
        });
    } catch (err) {
        res.status(500).json({error: 'Failed to submit expression of interest'});
    }
});

module.exports = router;