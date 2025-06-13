import React, { useState } from 'react';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus(null);

    const res = await fetch('http://localhost:4000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('Wiadomość wysłana!');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('Błąd przy wysyłaniu wiadomości.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formularz kontaktowy</h2>
      <input
        name="name"
        placeholder="Twoje imię"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Twój email"
        value={form.email}
        onChange={handleChange}
        type="email"
        required
      />
      <textarea
        name="message"
        placeholder="Wiadomość"
        value={form.message}
        onChange={handleChange}
        required
      />
      <button type="submit">Wyślij</button>
      {status && <p>{status}</p>}
    </form>
  );
}

export default ContactForm;
