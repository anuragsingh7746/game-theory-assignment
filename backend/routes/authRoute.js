const express = require('express');
const { validateUser } = require('../controllers/authController'); // Import the controller

const router = express.Router();

// POST route to validate user login
router.post('/', validateUser);

module.exports = router;
