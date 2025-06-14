import { useEffect, useState } from 'react';
import React from 'react';
import './../styles/components/NewsList.css';

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/news')
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNews(sorted);
      })
      .catch(err => console.error(err));
  }, []);

  if (!news.length) return <p>Brak aktualności.</p>;

  return (
    <div className="news-container">
      {news.map(item => (
        <div key={item._id} className="news-card">
          {item.imageUrl && (
            <div className="news-image">
              <img src={item.imageUrl} alt="news" />
            </div>
          )}
          <div className="news-content">
            <div className="news-header">
              <h2>{item.title}</h2>
              <span className="news-date">{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="news-text">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
