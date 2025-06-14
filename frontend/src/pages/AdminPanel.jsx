import React, { useState } from 'react';
import AddNewsForm from './../components/AddNewsForm';
import NewsEditor from './../components/NewsEditor';
import AddProjectForm from './../components/AddProjectForm';
import ProjectEditor from './../components/ProjectEditor';
import LoginForm from './../components/LoginForm';
import './../styles/components/admin-panel/AdminPanel.css';

function AdminPanel() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [view, setView] = useState('add-news');

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  if (!token) return <LoginForm onLogin={setToken} />;

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <button onClick={logout} className="logout-button">🚪 Wyloguj</button>
        <ul>
          <li onClick={() => setView('add-news')} className={view === 'add-news' ? 'active' : ''}>➕ Dodaj aktualność</li>
          <li onClick={() => setView('edit-news')} className={view === 'edit-news' ? 'active' : ''}>📝 Edytuj aktualności</li>
          <li onClick={() => setView('add-project')} className={view === 'add-project' ? 'active' : ''}>➕ Dodaj projekt</li>
          <li onClick={() => setView('edit-project')} className={view === 'edit-project' ? 'active' : ''}>🛠 Edytuj projekty</li>
        </ul>
      </aside>

      <main className="admin-content">
        {view === 'add-news' && (
          <div className="admin-form-wrapper">
            <AddNewsForm token={token} />
          </div>
        )}
        {view === 'edit-news' && <NewsEditor token={token} />}
        {view === 'add-project' && <AddProjectForm token={token} />}
        {view === 'edit-project' && <ProjectEditor token={token} />}
      </main>
    </div>
  );
}

export default AdminPanel;
