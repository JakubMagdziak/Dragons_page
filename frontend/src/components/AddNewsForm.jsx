import { useState } from 'react';
import React from 'react';


function AddNewsForm({ token }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
const [file, setFile] = useState(null);

const handleUpload = async () => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch('http://localhost:4000/api/upload', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
    body: formData,
  });
  const data = await res.json();
  return data.imageUrl;
};

const submit = async (e) => {
  e.preventDefault();
  let finalImageUrl = imageUrl;
  if (file) finalImageUrl = await handleUpload();

  const res = await fetch('http://localhost:4000/api/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, imageUrl: finalImageUrl }),
  });

  if (res.ok) alert('Dodano!');
  else alert('Błąd przy dodawaniu');
};


  return (
    <form onSubmit={submit}>
      <h2>Dodaj aktualność</h2>
      <input placeholder="Tytuł" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Treść" value={content} onChange={e => setContent(e.target.value)} />
      <input placeholder="Link do obrazu (opcjonalnie)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />

      <button type="submit">Dodaj</button>
    </form>
  );
}

export default AddNewsForm;
