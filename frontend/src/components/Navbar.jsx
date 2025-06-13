import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import './../styles/components/Navbar.css'; // Assuming you have a CSS file for styling
import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Dragons 🐉</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/news">News</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <div className="controls">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
