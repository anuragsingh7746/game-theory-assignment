import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CourtSlot from '../components/CourtSlot';
import BookingModal from '../components/BookingModal';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Schedule() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sport = searchParams.get('sport');
  const center = searchParams.get('center');
  localStorage.setItem('sport_id', sport);
  localStorage.setItem('center_id', center);
  const [bookings, setBookings] = useState([]);  // Ensure initial state is an array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState('');  // Error state
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);  // Default to today's date

  // Fetch bookings based on sport, center, and selectedDate
  useEffect(() => {
    if (!sport || !center) {
      navigate('/');  // Redirect if no sport or center is provided
    } else {
      const fetchBookings = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await fetch(`${API_URL}/api/view`, {
            method: 'POST',  // Use POST request
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sport_id: sport,   // Send sport, center, and selected date in the request body
              center_id: center,
              date: selectedDate,  // Send the selected date in the request
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch schedule data');
          }

          const data = await response.json();
          console.log('API response:', data);  // Debug the response

          // Check if response contains a success field and data is an array
          if (data.success && Array.isArray(data.data)) {
            setBookings(data.data);  // Set bookings from the data array
          } else {
            console.error('Unexpected data format:', data);
            setError('Unexpected data format from server.');
          }
        } catch (error) {
          console.error('Error fetching bookings:', error);
          setError('Failed to load schedule. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    }
  }, [sport, center, selectedDate, navigate]);  // Re-run effect when the selectedDate changes

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);  // Update the selected date
  };

  const openModal = (slot, courtId, courtNumber) => {
    setSelectedSlot({ ...slot, courtId, courtNumber });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBooking = (userName) => {
    const updatedBookings = bookings.map((court) => {
      if (court.court_id === selectedSlot.courtId) {
        return {
          ...court,
          slots: court.slots.map((slot) =>
            slot.start_time === selectedSlot.start_time ? { ...slot, status: 'booked' } : slot
          ),
        };
      }
      return court;
    });
    setBookings(updatedBookings);
    closeModal();
  };

  return (
    <div>
      <h2>Schedule for {sport} at {center}</h2>
      
      {/* Date Picker or Dropdown for Date Selection */}
      <label htmlFor="bookingDate">Select Booking Date: </label>
      <input
        type="date"
        id="bookingDate"
        value={selectedDate}
        min={new Date().toISOString().split('T')[0]}  // Set minimum date to today
        onChange={handleDateChange}  // Fetch new data when the date changes
      />

      {loading ? (
        <p>Loading schedule...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div>
          {Array.isArray(bookings) ? (
            bookings.map((court) => (
              <CourtSlot
                key={court.court_id}  // Use court_id as key
                court={court}
                onSlotClick={(slot) => openModal(slot, court.court_id, court.court_number)}
              />
            ))
          ) : (
            <p>No courts available for the selected date.</p>  // Fallback if bookings is not an array
          )}
        </div>
      )}

      {isModalOpen && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedSlot={selectedSlot}
          onBook={handleBooking}
        />
      )}
    </div>
  );
}

export default Schedule;
