import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
        <div>
          <Link to="/">Home</Link> |{" "}
          <Link to="/news">Aktualności</Link> |{" "}
          <Link to="/projects">Projekty</Link> |{" "}
          <Link to="/contact">Kontakt</Link>
        </div>
        <div>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a> |{" "}
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a> |{" "}
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <p>© 2025 Dragons Cybersecurity Club</p>
      </footer>
  );
}

export default Footer;
