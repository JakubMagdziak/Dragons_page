import { useEffect, useState } from 'react';
import React from 'react';

function NewsEditor({ token }) {
  const [newsList, setNewsList] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchNews = () => {
    fetch('http://localhost:4000/api/news')
      .then(res => res.json())
      .then(setNewsList);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Na pewno chcesz usunąć?")) return;
    await fetch(`http://localhost:4000/api/news/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token },
    });
    fetchNews();
  };

  const handleSave = async () => {
    const res = await fetch(`http://localhost:4000/api/news/${editItem._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(editItem),
    });
    if (res.ok) {
      setEditItem(null);
      fetchNews();
    }
  };

  return (
    <div>
      <h2>Zarządzanie aktualnościami</h2>
      {newsList.map(item => (
        <div key={item._id} style={{ borderBottom: '1px solid var(--primary-fg)', padding: '1rem 0' }}>
          {editItem && editItem._id === item._id ? (
            <>
              <input value={editItem.title} onChange={e => setEditItem({ ...editItem, title: e.target.value })} />
              <textarea value={editItem.content} onChange={e => setEditItem({ ...editItem, content: e.target.value })} />
              <input value={editItem.imageUrl || ''} onChange={e => setEditItem({ ...editItem, imageUrl: e.target.value })} />
              <button onClick={handleSave}>Zapisz</button>
              <button onClick={() => setEditItem(null)}>Anuluj</button>
            </>
          ) : (
            <>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <p><i>{new Date(item.createdAt).toLocaleString()}</i></p>
              {item.imageUrl && <img src={item.imageUrl} alt="news" style={{ maxWidth: '200px' }} />}
              <br />
              <button onClick={() => setEditItem(item)}>Edytuj</button>
              <button onClick={() => handleDelete(item._id)}>Usuń</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default NewsEditor;
