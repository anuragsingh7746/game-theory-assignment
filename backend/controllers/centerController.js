const Center = require('../models/Center');

// Controller to fetch all centers that have a specific sport
const fetchCentersBySport = async (req, res) => {
  const { sport_id } = req.body; // sport_id from request body

  try {
    // Step 1: Find all centers where the sport_id exists in the sports array
    const centers = await Center.find({
      sports: { $elemMatch: { sport_id } }  // Query centers with the sport_id
    });

    if (!centers || centers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No centers found offering this sport.'
      });
    }

    // Step 2: Return the list of centers
    return res.status(200).json({
      success: true,
      data: centers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching centers.',
      error: error.message
    });
  }
};

module.exports = { fetchCentersBySport };
