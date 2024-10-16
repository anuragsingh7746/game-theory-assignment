const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  center_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Center'  // Reference to the Center collection
  },
  court_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Court'  // Reference to the Court collection
  },
  sport_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Sport'  // Reference to the Sport collection
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'  // Reference to the Customer collection (assuming a customer collection exists)
  },
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed'],  // Add more statuses if needed
    default: 'pending',
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;