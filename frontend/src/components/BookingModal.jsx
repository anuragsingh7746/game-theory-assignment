import React, { useState, useEffect } from 'react';

function BookingModal({ isOpen, onClose, selectedSlot, onBook }) {
  const [userName, setUserName] = useState('');
  const [centerId, setCenterId] = useState(null);
  const [sportId, setSportId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [centerExists, setCenterExists] = useState(false); // New state to check if center exists
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const storedCenterId = localStorage.getItem('center_id');
    const storedSportId = localStorage.getItem('sport_id');
    const storedUserId = localStorage.getItem('username');
    const centerexist = localStorage.getItem('centerexist');
    if(centerexist==="true"){
      setCenterExists(true);
    }
    else{
      setCenterExists(false);
    }

    setCenterId(storedCenterId);
    setSportId(storedSportId);
    setUserName(storedUserId);

    // Check if center exists (assuming if centerId is not null, it exists)

  }, []);

  const handleBooking = async () => {
    if (centerId && sportId && (centerExists || userName)) { // Check for userName only if center does not exist
      try {
        const bookingData = {
          court_id: selectedSlot.courtId,
          sport_id: sportId,
          center_id: centerId,
          start_time: selectedSlot.start_time,
          end_time: selectedSlot.end_time || null,
          username: centerExists ? undefined : userName, // Don't send username if center exists
        };

        const response = await fetch(`${API_URL}/api/booking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to book court');
        }

        const result = await response.json();
        console.log('Booking successful:', result);

        onBook(userName);
      } catch (error) {
        console.error('Error during booking:', error);
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage('Please provide all necessary information.');
    }
  };

  return isOpen ? (
    <div className="modal">
      <h2>Booking for Court {selectedSlot.courtNumber} on {selectedSlot.time}</h2>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <div>
        {/* Render username input only if center does not exist */}
        {centerExists && (
          <label>
            User ID:
            <input 
              type="text" 
              placeholder="Enter User ID" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
            />
          </label>
        )}
        <button onClick={handleBooking} disabled={!centerExists && !userName}>
          Book Now
        </button>
      </div>

      <button onClick={onClose}>Close</button>
    </div>
  ) : null;
}

export default BookingModal;
