import React, { useState } from 'react';
import AddNewsForm from './../components/AddNewsForm';
import NewsEditor from './../components/NewsEditor';
import AddProjectForm from './../components/AddProjectForm';
import ProjectEditor from './../components/ProjectEditor';
import LoginForm from './../components/LoginForm';

function AdminPanel() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  if (!token) return <LoginForm onLogin={setToken} />;

  return (
    <div className="container">
      <h1>Panel administratora</h1>
      
      {/* 🔴 Przycisk wylogowania */}
      <button onClick={logout} style={{ float: 'right' }}>Wyloguj</button>

      <AddNewsForm token={token} />
      <NewsEditor token={token} />
      <hr />
      <AddProjectForm token={token} />
      <ProjectEditor token={token} />
    </div>
  );
}

export default AdminPanel;
