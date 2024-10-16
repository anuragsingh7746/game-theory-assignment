const express = require('express');
const { fetchSports } = require('../controllers/sportsController'); // Import the controller

const router = express.Router();

// POST route to fetch sports
router.post('/', fetchSports);

module.exports = router;
