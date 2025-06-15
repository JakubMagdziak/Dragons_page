import React from 'react';
import '../styles/components/ProjectList.css';

function SingleProject({ project }) {
  return (
    <div className="project-card">
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
            {project.tags.map((tag, idx) => (
              <span key={idx} className="project-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleProject;
