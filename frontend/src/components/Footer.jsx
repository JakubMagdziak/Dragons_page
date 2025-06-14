import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './../styles/components/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/news">Aktualności</Link>
        <Link to="/projects">Projekty</Link>
        <Link to="/contact">Kontakt</Link>
      </div>

      <div className="footer-socials">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
          <FaFacebook />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>

      <p className="footer-copy">© 2025 Dragons Cybersecurity Club</p>
    </footer>
  );
}

export default Footer;
