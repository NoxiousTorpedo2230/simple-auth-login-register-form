import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ isAuthenticated, setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make sure to include the full API URL
      const response = await axios.post('http://localhost:4000/api/auth/logout', {}, { 
        withCredentials: true 
      });
      
      if (response.data.success) {
        // Clear authentication state
        localStorage.removeItem('isAuthenticated');
        setAuth(false);
        navigate('/login');
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>AuthFlow</h1>
        </Link>
      </div>
      <nav className="nav">
        {isAuthenticated ? (
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register" className="signup-btn">Sign Up</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;