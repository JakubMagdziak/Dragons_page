import { useState } from 'react';
import React from 'react';

function AddProjectForm({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:4000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
      }),
    });

    if (res.ok) alert('Dodano projekt!');
    else alert('Błąd przy dodawaniu');
  };

  return (
    <form onSubmit={submit}>
      <h2>Dodaj projekt</h2>
      <input placeholder="Tytuł" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Opis" value={description} onChange={e => setDescription(e.target.value)} />
      <input placeholder="Tagi (oddzielone przecinkami)" value={tags} onChange={e => setTags(e.target.value)} />
      <button type="submit">Dodaj</button>
    </form>
  );
}

export default AddProjectForm;
