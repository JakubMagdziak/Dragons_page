import NewsList from '../components/NewsList';
import React from 'react';
import './../styles/pages/News.css';

function NewsPage() {
  return (
    <div className="news-page">
      <h1>Aktualności</h1>
      <NewsList />
    </div>
  );
}

export default NewsPage;
