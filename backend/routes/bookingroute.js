const express = require('express');
const { createBooking } = require('../controllers/bookingController'); // Import the controller

const router = express.Router();

// POST route to create a new booking
router.post('/', createBooking);

module.exports = router;