import React from 'react';
import './../styles/components/admin-panel/ProjectPreview.css';

function ProjectPreview({ project }) {
  if (!project) return null;

  return (
    <div className="preview-project-card">
      {project.imageUrl && (
        <div className="preview-image">
          <img src={project.imageUrl} alt="Podgląd" />
        </div>
      )}

      <div className="preview-content">
        <div className="preview-header">
          <div className="preview-meta">
            <h3>{project.title || 'Brak tytułu'}</h3>
            {project.status && (
              <span className={`status-badge status-${project.status.replace(/\s/g, '-').toLowerCase()}`}>
                {project.status}
              </span>
            )}
          </div>
          <span className="preview-date">
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <p className="preview-description">{project.description || 'Brak opisu'}</p>

        {project.tags?.length > 0 && (
          <div className="preview-tags">
            {project.tags.map((tag, index) => (
              <span key={index} className="tag-chip">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectPreview;
