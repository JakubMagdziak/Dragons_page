import React, { useEffect, useState } from 'react';
import NewsList from '../components/NewsList';
import AddNewsForm from '../components/AddNewsForm';

const Home = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await fetch('http://localhost:4000/news');
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const addNews = async (newsItem) => {
    try {
      const res = await fetch('http://localhost:4000/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsItem),
      });
      if (res.ok) {
        const newNews = await res.json();
        setNews((prevNews) => [newNews, ...prevNews]);
      } else {
        alert('Failed to add news');
      }
    } catch (error) {
      alert('Error adding news');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Latest News</h1>
      <AddNewsForm onAdd={addNews} />
      <NewsList news={news} />
    </div>
  );
};

export default Home;
