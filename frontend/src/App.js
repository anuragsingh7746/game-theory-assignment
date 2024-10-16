import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SportCenterSelect from './components/SportCenterSelect';
import Schedule from './components/Schedule';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <SportCenterSelect onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
        />
        
        <Route
          path="/schedule"
          element={isAuthenticated ? <Schedule /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
