import { useState } from 'react';
import React from 'react';
import SuccessMessage from './SuccessMessage';
import './../styles/components/admin-panel/AddProjectForm.css';

function AddProjectForm({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  const handleTagInput = (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setTags([]);
    setTagInput('');
    setSuccessOpen(false);
  };

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
        imageUrl,
        tags,
      }),
    });

    if (res.ok) {
      setSuccessOpen(true);
    } else {
      alert('Błąd przy dodawaniu');
    }
  };

  return (
    <>
      <form className="add-project-form" onSubmit={submit}>
        <h2>Dodaj projekt</h2>

        <input
          type="text"
          placeholder="Tytuł"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Opis"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Link do obrazka"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />

        {imageUrl && (
          <div className="project-image-preview">
            <img src={imageUrl} alt="Podgląd" />
          </div>
        )}

        <div className="tag-input-container">
          {tags.map((tag, index) => (
            <div key={index} className="tag-chip">
              {tag}
              <span onClick={() => removeTag(tag)}>×</span>
            </div>
          ))}
          <input
            type="text"
            placeholder="Dodaj tag i naciśnij spację"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleTagInput}
          />
        </div>

        <button type="submit">Dodaj</button>
      </form>

      <SuccessMessage
        open={successOpen}
        message="Projekt został dodany!"
        onClose={resetForm}
      />
    </>
  );
}

export default AddProjectForm;
