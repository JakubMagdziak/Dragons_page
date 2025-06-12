import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#20c20e" : "#bbb",
    textDecoration: "none",
    margin: "0 1rem",
    fontWeight: "bold",
  });

  return (
    <nav style={{ backgroundColor: "#000", padding: "1rem 2rem", display: "flex", alignItems: "center" }}>
      <div style={{ flexGrow: 1, color: "#20c20e", fontWeight: "bold", fontSize: "1.5rem" }}>
        Cybersecurity Research Group
      </div>
      <div>
        <Link to="/" style={linkStyle("/")}>Home</Link>
        <Link to="/news" style={linkStyle("/news")}>News</Link>
        <Link to="/projects" style={linkStyle("/projects")}>Projects</Link>
        <Link to="/contact" style={linkStyle("/contact")}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
