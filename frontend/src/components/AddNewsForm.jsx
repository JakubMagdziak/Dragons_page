import { useState } from 'react';
import React from 'react';
import SuccessMessage from './SuccessMessage';
import './../styles/components/admin-panel/AddNewsForm.css';

function AddNewsForm({ token }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImageUrl('');
    setSuccessOpen(false);
  };

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:4000/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, imageUrl }),
    });

    if (res.ok) {
      setSuccessOpen(true);
    } else {
      alert('Błąd przy dodawaniu');
    }
  };

  return (
    <>
      <form className="add-news-form" onSubmit={submit}>
        <h2>Dodaj aktualność</h2>

        <input
          type="text"
          placeholder="Tytuł"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Treść"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <input
          type="text"
          placeholder="Link do obrazu (opcjonalnie)"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />

        {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt="Podgląd" />
          </div>
        )}

        <button type="submit">Dodaj</button>
      </form>

      <SuccessMessage
        open={successOpen}
        message="Aktualność została dodana!"
        onClose={resetForm}
      />
    </>
  );
}

export default AddNewsForm;
