import { useEffect, useState } from 'react';
import React from 'react';

function ProjectEditor({ token }) {
  const [projects, setProjects] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchProjects = () => {
    fetch('http://localhost:4000/api/projects')
      .then(res => res.json())
      .then(setProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Na pewno chcesz usunąć projekt?")) return;
    await fetch(`http://localhost:4000/api/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token },
    });
    fetchProjects();
  };

  const handleSave = async () => {
    const res = await fetch(`http://localhost:4000/api/projects/${editItem._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(editItem),
    });

    if (res.ok) {
      setEditItem(null);
      fetchProjects();
    }
  };

  return (
    <div>
      <h2>Zarządzanie projektami</h2>
      {projects.map(item => (
        <div key={item._id} style={{ borderBottom: '1px solid var(--primary-fg)', padding: '1rem 0' }}>
          {editItem?._id === item._id ? (
            <>
              <input value={editItem.title} onChange={e => setEditItem({ ...editItem, title: e.target.value })} />
              <textarea value={editItem.description} onChange={e => setEditItem({ ...editItem, description: e.target.value })} />
              <input value={editItem.tags.join(', ')} onChange={e => setEditItem({ ...editItem, tags: e.target.value.split(',').map(t => t.trim()) })} />
              <button onClick={handleSave}>Zapisz</button>
              <button onClick={() => setEditItem(null)}>Anuluj</button>
            </>
          ) : (
            <>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><b>Tagi:</b> {item.tags?.join(', ')}</p>
              <button onClick={() => setEditItem(item)}>Edytuj</button>
              <button onClick={() => handleDelete(item._id)}>Usuń</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectEditor;
