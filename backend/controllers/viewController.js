const Court = require('../models/Court');
const Booking = require('../models/Booking');
const moment = require('moment-timezone');

// Helper function to generate time slots between 6 AM and 10 PM
const generateTimeSlots = (date, timezone) => {
  const slots = [];
  
  // Create a moment object for the start of the day at 6 AM in the provided timezone
  let currentTime = moment.tz(date, timezone).set({ hour: 6, minute: 0, second: 0, millisecond: 0 });
  
  // Create a moment object for the end of the last slot (9 PM to 10 PM)
  const endOfDay = moment.tz(date, timezone).set({ hour: 22, minute: 0, second: 0, millisecond: 0 });

  // Generate slots of 60 minutes from 6 AM to 10 PM
  while (currentTime.isSameOrBefore(endOfDay)) {
    const nextSlot = currentTime.clone().add(1, 'hour'); // Each slot is 60 minutes
    
    slots.push({
      start_time: currentTime.toISOString(),
      end_time: nextSlot.toISOString(),
      status: 'available' // Default to 'available'
    });

    currentTime = nextSlot; // Move to the next 60-minute slot
  }

  return slots;
};

const fetchCourtsAndBookedSlots = async (req, res) => {
  const { sport_id, center_id, date, timezone = 'UTC' } = req.body; // Default to UTC if no timezone provided

  try {
    // Step 1: Fetch all courts for the given center and sport
    const courts = await Court.find({ center_id, sport_id });

    if (!courts || courts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No courts found for the given center and sport.'
      });
    }

    // Step 2: Fetch all bookings for the courts on the given date
    const startOfDay = moment.tz(date, timezone).set({ hour: 6, minute: 0, second: 0, millisecond: 0 }).toDate();
    const endOfDay = moment.tz(date, timezone).set({ hour: 22, minute: 0, second: 0, millisecond: 0 }).toDate();

    const bookings = await Booking.find({
      center_id,
      sport_id,
      court_id: { $in: courts.map(court => court._id) },
      start_time: { $gte: startOfDay, $lte: endOfDay }
    });

    // Step 3: Map bookings to courts and generate slots with status
    const slotsByCourt = courts.map(court => {
      const allSlots = generateTimeSlots(date, timezone); // Generate time slots for the day

      // Check bookings for this court
      const courtBookings = bookings.filter(booking => booking.court_id.toString() === court._id.toString());

      // Mark slots as 'booked' if they overlap with any booking
      allSlots.forEach(slot => {
        courtBookings.forEach(booking => {
          const bookingStart = moment.tz(booking.start_time, timezone);
          const bookingEnd = moment.tz(booking.end_time, timezone);

          const slotStart = moment.tz(slot.start_time, timezone);
          const slotEnd = moment.tz(slot.end_time, timezone);

          // Check if the slot overlaps with the booking time
          if (
            (slotStart.isSameOrAfter(bookingStart) && slotStart.isBefore(bookingEnd)) ||
            (slotEnd.isAfter(bookingStart) && slotEnd.isSameOrBefore(bookingEnd)) ||
            (slotStart.isBefore(bookingStart) && slotEnd.isAfter(bookingEnd))  // Slot spans the booking
          ) {
            slot.status = 'booked';
          }
        });
      });

      return {
        court_id: court._id,
        court_number: court.court_number,
        slots: allSlots
      };
    });

    // Step 4: Return the response with courts and their slots
    return res.status(200).json({
      success: true,
      data: slotsByCourt
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching courts and slots.',
      error: error.message
    });
  }
};

module.exports = { fetchCourtsAndBookedSlots };
