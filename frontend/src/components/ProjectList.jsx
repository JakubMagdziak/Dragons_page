import { useEffect, useState } from 'react';
import React from 'react';
import '../styles/components/ProjectList.css';

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
      {projects.map((project) => {
        return (
          <div key={project._id} className="project-card">
            {project.imageUrl && (
              <img src={project.imageUrl} alt={project.title} className="project-image" />
            )}

            <div className="project-content">
              <div className="project-header">
                <div className="project-meta">
                  <h2>{project.title}</h2>
                  {project.status && (
                    <span className={`project-status status-${project.status.replace(/\s/g, '-').toLowerCase()}`}>
                      {project.status}
                    </span>
                  )}
                </div>
                <span className="project-date">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="project-description">{project.description}</p>

              {project.tags?.length > 0 && (
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectList;
