import { useEffect, useState } from 'react';
import React from 'react';
import ConfirmDialog from './ConfirmDialog';
import ProjectPreview from './ProjectPreview';
import './../styles/components/admin-panel/ProjectEditor.css';

function ProjectEditor({ token }) {
  const [projects, setProjects] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const fetchProjects = () => {
    setLoading(true);
    fetch('http://localhost:4000/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    await fetch(`http://localhost:4000/api/projects/${pendingDeleteId}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token },
    });
    setConfirmOpen(false);
    setPendingDeleteId(null);
    fetchProjects();
  };

  const handleSave = async () => {
    setSaving(true);
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
    setSaving(false);
  };

  const handleTagInput = (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && tagInput.trim()) {
      e.preventDefault();
      if (!editItem.tags.includes(tagInput.trim())) {
        setEditItem({
          ...editItem,
          tags: [...editItem.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setEditItem({
      ...editItem,
      tags: editItem.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="project-editor">
      <h2>Zarządzanie projektami</h2>

      {loading && <div className="spinner">⏳ Ładowanie projektów...</div>}

      {projects.map(item => (
        <div key={item._id} className="project-item">
          <div className="project-header">
            <h3>{item.title}</h3>
            <span className="project-date">{new Date(item.createdAt).toLocaleString()}</span>
          </div>

          {editItem?._id === item._id ? (
            <div className="project-edit-box">
              <input
                value={editItem.title}
                onChange={e => setEditItem({ ...editItem, title: e.target.value })}
                placeholder="Tytuł"
              />

              <textarea
                value={editItem.description}
                onChange={e => setEditItem({ ...editItem, description: e.target.value })}
                placeholder="Opis"
              />

              <input
                value={editItem.imageUrl || ''}
                onChange={e => setEditItem({ ...editItem, imageUrl: e.target.value })}
                placeholder="Link do obrazka"
              />

              {editItem.imageUrl && (
                <div className="project-image-preview">
                  <img src={editItem.imageUrl} alt="Podgląd" />
                </div>
              )}

              <select
                value={editItem.status || 'planowany'}
                onChange={e => setEditItem({ ...editItem, status: e.target.value })}
              >
                <option value="planowany">🕒 Planowany</option>
                <option value="w trakcie">⚙️ W trakcie</option>
                <option value="zakończony">✅ Zakończony</option>
              </select>

              <div className="tag-input-container">
                {editItem.tags.map((tag, index) => (
                  <div key={index} className="tag-chip">
                    {tag}
                    <span onClick={() => removeTag(tag)}>×</span>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Dodaj tag"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                />
              </div>

              <div className="edit-controls">
                <button onClick={handleSave} disabled={saving}>
                  {saving ? 'Zapisywanie...' : '💾 Zapisz'}
                </button>
                <button onClick={() => setEditItem(null)}>❌ Anuluj</button>
                <button onClick={() => requestDelete(item._id)}>🗑 Usuń</button>
              </div>

              <ProjectPreview project={editItem} />
            </div>
          ) : (
            <div className="edit-actions">
              <button onClick={() => setEditItem(item)}>✏️ Edytuj</button>
            </div>
          )}
        </div>
      ))}

      <ConfirmDialog
        open={confirmOpen}
        message="Czy na pewno chcesz usunąć ten projekt?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default ProjectEditor;
