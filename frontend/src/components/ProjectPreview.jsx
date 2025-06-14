import React from 'react';
import './../styles/components/admin-panel/ProjectPreview.css';

function ProjectPreview({ project }) {
  if (!project) return null;

  return (
    <div className="project-preview">
      <h4>{project.title || 'Brak tytułu'}</h4>
      {project.imageUrl && (
        <img src={project.imageUrl} alt="Podgląd" />
      )}
      <p>{project.description || 'Brak opisu'}</p>

      {project.tags?.length > 0 && (
        <div className="preview-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag-chip">{tag}</span>
          ))}
        </div>
      )}

      {project.status && (
        <span className={`status-badge status-${project.status.replace(/\s/g, '-').toLowerCase()}`}>
          {project.status}
        </span>
      )}
    </div>
  );
}

export default ProjectPreview;
