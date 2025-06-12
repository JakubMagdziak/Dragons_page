import { useEffect, useState } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  if (!projects.length) return <p>Brak projektów.</p>;

  return (
    <div>
      {projects.map(project => (
        <div key={project._id} className="project-card">
          <h2>{project.title}</h2>
          <p><i>{new Date(project.createdAt).toLocaleDateString()}</i></p>
          <p>{project.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
