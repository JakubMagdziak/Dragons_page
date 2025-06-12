import React from "react";
import { Link } from "react-router-dom";

const newsData = [
  { id: 1, title: "New Project Launched", date: "2025-06-10", summary: "We started a new research project on cloud security." },
  { id: 2, title: "Cybersecurity Workshop", date: "2025-05-25", summary: "Join our workshop to learn about penetration testing." },
  { id: 3, title: "CTF Competition Results", date: "2025-05-10", summary: "Our team placed 2nd in the recent university CTF." },
  { id: 4, title: "Guest Lecture", date: "2025-04-15", summary: "We hosted a lecture on malware analysis." },
];

const LatestNews = ({ maxItems }) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {newsData.slice(0, maxItems).map(({ id, title, date, summary }) => (
        <li key={id} style={{ marginBottom: "1rem", borderBottom: "1px solid #333", paddingBottom: "0.5rem" }}>
          <Link to="/news" style={{ color: "#20c20e", textDecoration: "none", fontWeight: "bold" }}>
            {title}
          </Link>
          <div style={{ fontSize: "0.8rem", color: "#999" }}>{new Date(date).toLocaleDateString()}</div>
          <div>{summary}</div>
        </li>
      ))}
    </ul>
  );
};

export default LatestNews;
