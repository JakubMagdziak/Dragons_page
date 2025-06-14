import ProjectList from '../components/ProjectList';
import React from 'react';
import './../styles/pages/Projects.css';

function ProjectsPage() {
  return (
    <div className="projects-page">
      <h1>Projekty</h1>
      <ProjectList />
    </div>
  );
}

export default ProjectsPage;
