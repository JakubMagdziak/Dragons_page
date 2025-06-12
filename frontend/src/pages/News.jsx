import React from "react";

const newsData = [
  { id: 1, title: "New Project Launched", date: "2025-06-10", summary: "We started a new research project on cloud security." },
  { id: 2, title: "Cybersecurity Workshop", date: "2025-05-25", summary: "Join our workshop to learn about penetration testing." },
  { id: 3, title: "CTF Competition Results", date: "2025-05-10", summary: "Our team placed 2nd in the recent university CTF." },
  { id: 4, title: "Guest Lecture", date: "2025-04-15", summary: "We hosted a lecture on malware analysis." },
];

const News = () => {
  return (
    <div>
      <h1 style={{ color: "#20c20e", marginBottom: "1rem" }}>News</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {newsData.map(({ id, title, date, summary }) => (
          <li key={id} style={{ marginBottom: "1rem", borderBottom: "1px solid #333", paddingBottom: "0.5rem" }}>
            <h2>{title}</h2>
            <div style={{ fontSize: "0.8rem", color: "#999" }}>{new Date(date).toLocaleDateString()}</div>
            <p>{summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
