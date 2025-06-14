import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/pages/Home.css';
import logo from './../assets/logo.png'; // Zakładam, że logo jest w public folderze

function Home() {
  return (
    <div className="home">

      {/* Ogólne informacje o kole */}
      <section className="intro">
        <img src={logo} alt="Logo Koła Dragons" className="logo-image" />
        <h1>Witamy na stronie Koła Naukowego Dragons 🐉</h1>
        <p>
          Zajmujemy się cyberbezpieczeństwem, bierzemy udział w CTF-ach, tworzymy honeypoty i dzielimy się wiedzą!
        </p>
      </section>

      <section className="news-preview">
        <h2>Aktualności</h2>
        <div className="news-list">
          <div className="tile full">Aktualność 1 (pełna)</div>
          <div className="tile half blur-mask">Aktualność 2 (rozmazana dolna połowa)</div>
        </div>
        <Link to="/news" className="link-button">Zobacz więcej aktualności</Link>
      </section>

      <section className="projects-preview">
        <h2>Projekty</h2>
        <div className="projects-list">
          <div className="tile full">Projekt 1 (pełny)</div>
          <div className="tile half blur-mask">Projekt 2 (rozmazana dolna połowa)</div>
        </div>
        <Link to="/projects" className="link-button">Zobacz wszystkie projekty</Link>
      </section>

    </div>
  );
}

export default Home;
