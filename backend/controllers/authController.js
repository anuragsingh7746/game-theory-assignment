const User = require('../models/User');

// Controller to validate user login without bcrypt
const validateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Step 1: Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    // Step 2: Compare the provided password with the stored password (plain text comparison)
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    // Step 3: If the user is valid, return the user_id, role, and center_id
    return res.status(200).json({
      success: true,
      data: {
        user_id: user._id,
        role: user.role,
        center_id: user.center_id || null  // If center_id is not available, return null
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login.',
      error: error.message
    });
  }
};

module.exports = { validateUser };
