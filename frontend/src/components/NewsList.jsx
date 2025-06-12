import React from 'react';

const NewsList = ({ news }) => {
  return (
    <div>
      {news.length === 0 && <p>No news available.</p>}
      <ul>
        {news.map((item) => (
          <li key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <small>{new Date(item.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
