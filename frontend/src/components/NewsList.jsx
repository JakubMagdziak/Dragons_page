import { useEffect, useState } from 'react';

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error(err));
  }, []);

  if (!news.length) return <p>Brak aktualności.</p>;

  return (
    <div>
      {news.map(item => (
        <div key={item._id} className="news-card">
          <h2>{item.title}</h2>
          <p><i>{new Date(item.createdAt).toLocaleString()}</i></p>
          {item.imageUrl && <img src={item.imageUrl} alt="news" style={{ maxWidth: '100%' }} />}
          <p>{item.content}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default NewsList;
