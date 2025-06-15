import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../styles/pages/Home.css';
import logo from './../assets/logo.png';
import SingleProject from '../components/SingleProject';
import SingleNews from '../components/SingleNews';

function Home() {
  const [news, setNews] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/news')
      .then(res => res.json())
      .then(data => setNews(data.slice(0, 2)));

    fetch('http://localhost:4000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data.slice(0, 2)));
  }, []);

  return (
    <div className="home">
      {/* Intro */}
      <section className="intro">
        <img src={logo} alt="Logo Koła Dragons" className="logo-image" />
        <h1>Witamy na stronie Koła Naukowego Dragons 🐉</h1>
        <p>
          Jesteśmy pasjonatami cyberbezpieczeństwa. Tworzymy honeypoty, analizujemy podatności,
          startujemy w CTF-ach i prowadzimy warsztaty dla studentów i uczniów.
          Naszym celem jest rozwój umiejętności technicznych, dzielenie się wiedzą oraz budowanie społeczności wokół bezpieczeństwa IT.
        </p>
      </section>

      {/* News */}
      <section className="news-preview">
        <h2>Aktualności</h2>
        <div className="home-list">
          {news.length > 0 && <SingleNews news={news[0]} />}
          {news.length > 1 && (
              <SingleNews news={news[1]} />
          )}
        </div>
        <Link to="/news" className="link-button">Zobacz więcej aktualności</Link>
      </section>

      {/* Projects */}
      <section className="projects-preview">
        <h2>Projekty</h2>
        <div className="home-list">
          {projects.length > 0 && <SingleProject project={projects[0]} />}
          {projects.length > 1 && (
              <SingleProject project={projects[1]} />
          )}
        </div>
        <Link to="/projects" className="link-button">Zobacz wszystkie projekty</Link>
      </section>
    </div>
  );
}

export default Home;
