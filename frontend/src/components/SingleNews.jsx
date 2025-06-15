import React from 'react';
import '../styles/components/NewsCard.css'; // lub wspólny plik

function SingleNews({ news }) {
  return (
    <div className="news-card">
      {news.imageUrl && (
        <img src={news.imageUrl} alt={news.title} className="news-image" />
      )}
      <div className="news-content">
        <div className="news-header">
          <h2>{news.title}</h2>
          <span className="news-date">
            {new Date(news.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="news-description">{news.content.slice(0, 250)}...</p>
      </div>
    </div>
  );
}

export default SingleNews;
