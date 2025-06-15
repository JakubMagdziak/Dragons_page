import React from 'react';
import './../styles/components/admin-panel/NewsPreview.css';

function NewsPreview({ news }) {
  if (!news) return null;

  return (
    <div className="preview-news-card">
      {news.imageUrl && (
        <div className="preview-image">
          <img src={news.imageUrl} alt="Podgląd" />
        </div>
      )}
      <div className="preview-content">
        <div className="preview-header">
          <h3>{news.title || 'Brak tytułu'}</h3>
          <span className="preview-date">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <p className="preview-text">{news.content || 'Brak treści'}</p>
      </div>
    </div>
  );
}

export default NewsPreview;
