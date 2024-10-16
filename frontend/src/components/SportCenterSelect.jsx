import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/SportCenterSelect.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function SportCenterSelect({ onLogout }) {
  const navigate = useNavigate();
  
  const [sports, setSports] = useState([]);  // Holds the list of available sports
  const [availableCenters, setAvailableCenters] = useState([]);  // Holds the centers for the selected sport
  const [selectedSport, setSelectedSport] = useState('');  // Selected sport (sport ID)
  const [selectedCenter, setSelectedCenter] = useState('');  // Selected center
  const [loading, setLoading] = useState(false);  // Loading state for API requests
  const [error, setError] = useState('');  // Error state for API errors
  const [centerIdExists, setCenterIdExists] = useState(false);  // Track if centerId exists

  // Fetch the list of sports when the component mounts
  useEffect(() => {
    const fetchSports = async () => {
      setLoading(true);
      try {
        // Retrieve the centerId from localStorage
        let centerId = localStorage.getItem('center_id');

        // Check if centerId exists and update the state
        if (centerId) {
          setCenterIdExists(true);
          localStorage.setItem('centerexist', "true");

        } else {
          centerId = null;
          setCenterIdExists(false);
          localStorage.setItem('centerexist', "false");

        }

        console.log('centerId from localStorage:', centerId);
        console.log('centerIdExists state:', centerIdExists);  // Debug log for centerIdExists state

        // Make a POST request to fetch sports, with centerId in the body
        const response = await fetch(`${API_URL}/api/sports`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ centerId }),  // Send centerId (null or valid ID) in the body of the request
        });

        const responseData = await response.json();

        // Ensure that we access the "data" field in the API response
        if (responseData.success && Array.isArray(responseData.data)) {
          setSports(responseData.data);  // Set the data array to sports
        } else {
          console.error('Unexpected API response:', responseData);
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching sports:', error);
        setError('Failed to load sports');
      } finally {
        setLoading(false);
      }
    };
    fetchSports();
  }, [centerIdExists]);  // Add centerIdExists to dependency array to ensure state is updated

  // Handle sport selection and fetch centers for that sport if centerId exists
  const handleSportChange = async (e) => {
    const sport_id = e.target.value;
    setSelectedSport(sport_id);
    setSelectedCenter('');  // Reset the selected center
    console.log('Selected sportId:', sport_id);

    if (sport_id && !centerIdExists) {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/center`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sport_id : sport_id }),  // Send the sportId to fetch the related centers
        });
        
        const centersData = await response.json();
        
        if (centersData.success && Array.isArray(centersData.data)) {
          setAvailableCenters(centersData.data);  // Set the data array to available centers
          console.log('Available centers:', centersData.data);  // Log centers for debugging
        } else {
          console.error('Unexpected API response:', centersData);
          setError('Failed to load centers');
        }
      } catch (error) {
        console.error('Error fetching centers:', error);
        setError('Failed to load centers');
      } finally {
        setLoading(false);
      }
    } else {
      setAvailableCenters([]);  // Clear the available centers if no sport is selected or no centerId
    }
  };

  const handleCenterChange = (e) => {
    setSelectedCenter(e.target.value);
  };

  const handleSubmit = () => {
    let centerId = selectedCenter;

    // If selectedCenter is empty and centerIdExists is false, retrieve from localStorage
    if (!centerId && centerIdExists) {
        centerId = localStorage.getItem('center_id');
    }

    if (selectedSport && centerId) {
        navigate(`/schedule?sport=${selectedSport}&center=${centerId}`);
    } else {
        alert('Please select both a sport and a center.');
    }
};


  return (
    <div>
      <Navbar onLogout={onLogout} />
      <div className="select-container">
        <h2>Select Sport and Center</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Sport:</label>
          <select value={selectedSport} onChange={handleSportChange}>
            <option value="">-- Select a Sport --</option>
            {sports.map((sport) => (
              <option key={sport._id} value={sport._id}>{sport.name}</option>  // Use sport._id as the value and sport.name for display
            ))}
          </select>
        </div>

        {/* Conditionally render the center selection only if centerIdExists is false */}
        {!centerIdExists && (
          <div className="form-group">
            <label>Center:</label>
            <select 
              value={selectedCenter} 
              onChange={handleCenterChange} 
              disabled={!selectedSport || availableCenters.length === 0}
            >
              <option value="">-- Select a Center --</option>
              {availableCenters.map((center) => (
                <option key={center._id} value={center._id}>{center.name}</option>
              ))}
            </select>
          </div>
        )}

        <button onClick={handleSubmit} disabled={!selectedSport || (!centerIdExists && !selectedCenter)}>
          View Schedule
        </button>
      </div>
    </div>
  );
}

export default SportCenterSelect;
