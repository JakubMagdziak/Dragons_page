import { useEffect, useState } from 'react';
import React from 'react';
import '.././styles/components/ProjectList.css';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/projects')
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProjects(sorted);
      })
      .catch(err => console.error(err));
  }, []);

  if (!projects.length) return <p>Brak projektów.</p>;

  return (
    <div className="project-container">
      {projects.map(project => (
       <div key={project._id} className="project-card">
        <div className="project-header">
          <h2>{project.title}</h2>
          <span className="project-date">{new Date(project.createdAt).toLocaleDateString()}</span>
        </div>

        <p className="project-description">{project.description}</p>

        {/* STATUS */}
        {project.status && (
          <span className={`project-status status-${project.status.toLowerCase()}`}>
            {project.status}
          </span>
        )}

        {/* TAGI */}
        <div className="project-tags">
          {project.tags && project.tags.map((tag, index) => (
            <span key={index} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>

      ))}
    </div>
  );
}

export default ProjectList;
