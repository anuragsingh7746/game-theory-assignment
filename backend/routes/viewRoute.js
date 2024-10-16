const express = require('express');
const { fetchCourtsAndBookedSlots } = require('../controllers/viewController'); // Import the controller

const router = express.Router();

// POST route to fetch courts and booked slots
router.post('/', fetchCourtsAndBookedSlots);

module.exports = router;
