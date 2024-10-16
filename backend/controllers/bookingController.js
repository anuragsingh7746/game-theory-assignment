const Booking = require('../models/Booking');
const User = require('../models/User');
const Center = require('../models/Center');
const Sport = require('../models/Sport');
const Court = require('../models/Court');

// Controller to create a new booking
const createBooking = async (req, res) => {
  const { username, center_id, sport_id, court_id, start_time, end_time } = req.body;

  try {
    // Step 1: Find the user by username to get customer_id
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // Step 2: Validate center, sport, and court existence
    const center = await Center.findById(center_id);
    if (!center) {
      return res.status(404).json({
        success: false,
        message: 'Center not found.'
      });
    }

    const sport = await Sport.findById(sport_id);
    if (!sport) {
      return res.status(404).json({
        success: false,
        message: 'Sport not found.'
      });
    }

    const court = await Court.findById(court_id);
    if (!court) {
      return res.status(404).json({
        success: false,
        message: 'Court not found.'
      });
    }

    // Step 3: Check for existing bookings that overlap with the requested time
    const existingBooking = await Booking.findOne({
      court_id,
      start_time: { $lt: new Date(end_time) },  // Overlapping booking condition
      end_time: { $gt: new Date(start_time) }
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'Court is already booked for the selected time.'
      });
    }

    // Step 4: Create a new booking if no conflicts
    const newBooking = new Booking({
      center_id,
      court_id,
      sport_id,
      customer_id: user._id,  // Link to the user who is booking
      start_time: new Date(start_time),
      end_time: new Date(end_time),
      status: 'confirmed'  // You can change this based on your logic
    });

    // Step 5: Save the booking in the database
    await newBooking.save();

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating the booking.',
      error: error.message
    });
  }
};

module.exports = { createBooking };
