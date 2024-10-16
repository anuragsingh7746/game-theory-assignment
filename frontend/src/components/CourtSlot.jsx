import React from 'react';
import '../styles/Schedule.css';  // Assuming you have CSS for styling

function CourtSlot({ court, onSlotClick }) {
  
  const formatTime = (startTime) => {
    // Create a Date object from start_time
    const date = new Date(startTime);
    
    // Subtract 5 hours and 30 minutes in milliseconds (5 * 60 * 60 * 1000) + (30 * 60 * 1000)
    const adjustedDate = new Date(date.getTime() - (5 * 60 * 60 * 1000 + 30 * 60 * 1000));

    // Return the formatted time
    return adjustedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="court-slot">
      <h3>Court {court.court_number}</h3> {/* Use court_number from the API response */}
      {court.slots.map((slot, index) => (
        <div
          key={index}
          className={`slot ${slot.status}`}  // Apply class based on status ('available', 'booked', etc.)
          onClick={() => slot.status === 'available' && onSlotClick(slot, court.court_id, court.court_number)}
          style={{ cursor: slot.status === 'available' ? 'pointer' : 'default' }}  // Show pointer for available slots
        >
          {/* Format time with the adjustment */}
          {formatTime(slot.start_time)} - 
          {slot.status === 'booked' ? 'Booked' : 'Available'} {/* Handle the display of status */}
        </div>
      ))}
    </div>
  );
}

export default CourtSlot;
