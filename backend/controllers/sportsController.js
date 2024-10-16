const Sport = require('../models/Sport'); // Assuming models are in a 'models' directory
const Center = require('../models/Center'); // Assuming models are in a 'models' directory

// Controller to fetch sports
const fetchSports = async (req, res) => {
  const { center_id } = req.body; // Get center_id from request body

  try {
    if (!center_id) {
      // User case: Fetch all sports from the sports table
      const sports = await Sport.find({});
      return res.status(200).json({
        success: true,
        data: sports,
      });
    } else {
      // Manager case: Fetch sports from the specific center
      const center = await Center.findById(center_id);

      if (!center) {
        return res.status(404).json({
          success: false,
          message: "Center not found",
        });
      }

      // Get sports for the specified center
      const sports = center.sports.map(s => ({
        sport_id: s.sport_id,
        name: s.name,
        courts: s.courts
      }));

      return res.status(200).json({
        success: true,
        data: sports,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports = { fetchSports };
