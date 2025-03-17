import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">WhaleWatch</h1>
        <div className="nav-links">
          <Link to="/" className="nav-link">홈</Link>
          <Link to="/community" className="nav-link">커뮤니티</Link>
          <a href="https://t.me/your_telegram_bot" target="_blank" rel="noopener noreferrer" className="signup-button">회원가입</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 