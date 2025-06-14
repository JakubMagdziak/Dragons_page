import { useEffect, useState } from 'react';
import React from 'react';
import ConfirmDialog from './ConfirmDialog';
import NewsPreview from './NewsPreview';
import './../styles/components/admin-panel/NewsEditor.css';

function NewsEditor({ token }) {
  const [newsList, setNewsList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch('http://localhost:4000/api/news')
      .then(res => res.json())
      .then(data => {
        setNewsList(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    await fetch(`http://localhost:4000/api/news/${pendingDeleteId}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token },
    });
    setConfirmOpen(false);
    setPendingDeleteId(null);
    fetchNews();
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`http://localhost:4000/api/news/${editItem._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(editItem),
    });

    if (res.ok) {
      setEditItem(null);
      fetchNews();
    }
    setSaving(false);
  };

  return (
    <div className="news-editor">
      <h2>Zarządzanie aktualnościami</h2>

      {loading && <div className="spinner">⏳ Ładowanie...</div>}

      {newsList.map(item => (
        <div key={item._id} className="news-item">
          <div className="news-header">
            <h3>{item.title}</h3>
            <span className="news-date">{new Date(item.createdAt).toLocaleString()}</span>
          </div>

          {editItem?._id === item._id ? (
            <div className="news-edit-box">
              <input
                value={editItem.title}
                onChange={e => setEditItem({ ...editItem, title: e.target.value })}
                placeholder="Tytuł"
              />

              <textarea
                value={editItem.content}
                onChange={e => setEditItem({ ...editItem, content: e.target.value })}
                placeholder="Treść"
              />

              <input
                value={editItem.imageUrl || ''}
                onChange={e => setEditItem({ ...editItem, imageUrl: e.target.value })}
                placeholder="Link do obrazka"
              />

              <NewsPreview news={editItem} />

              <div className="edit-controls">
                <button onClick={handleSave} disabled={saving}>
                  {saving ? 'Zapisywanie...' : '💾 Zapisz'}
                </button>
                <button onClick={() => setEditItem(null)}>❌ Anuluj</button>
                <button onClick={() => requestDelete(item._id)}>🗑 Usuń</button>
              </div>
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
        message="Czy na pewno chcesz usunąć tę aktualność?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default NewsEditor;
