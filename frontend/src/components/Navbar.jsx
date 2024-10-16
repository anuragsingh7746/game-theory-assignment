import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; // Import CSS for the navbar

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        Dashboard
      </div>
      <ul className="navbar-links">
        <li onClick={() => navigate('/')}>Dashboard</li>
        <li onClick={() => alert('View Bookings coming soon!')}>View Bookings</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
}

export default Navbar;
