// Setup router with new router object, import db
const express = require('express');
const router = express.Router();
const db = require('../db');

// create professors endpoint for testing and build
router.get('/', (req, res) => {
    res.send("A GET request ahs been made of the professors endpoint; returning a list of profs now.");
});

// export the router
module.exports = router;