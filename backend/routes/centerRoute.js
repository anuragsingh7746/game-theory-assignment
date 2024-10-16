const express = require('express');
const { fetchCentersBySport } = require('../controllers/centerController'); // Import the controller

const router = express.Router();

// POST route to fetch centers by sport_id
router.post('/', fetchCentersBySport);

module.exports = router;
