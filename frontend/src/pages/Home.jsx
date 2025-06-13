import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>

      {/* Ogólne informacje o kole */}
      <section>
        <h1>Witamy na stronie Koła Naukowego Dragons 🐉</h1>
        <p>
          Zajmujemy się cyberbezpieczeństwem, bierzemy udział w CTF-ach, tworzymy honeypoty i dzielimy się wiedzą!
        </p>
      </section>

      {/* Kafelki z aktualnościami */}
      <section>
        <h2>Aktualności</h2>
        <div>
          <div>Aktualność 1 (pełna)</div>
          <div>Aktualność 2 (w połowie widoczna)</div>
        </div>
        <Link to="/news">Zobacz więcej aktualności</Link>
      </section>

      {/* Kafelki z projektami */}
      <section>
        <h2>Projekty</h2>
        <div>
          <div>Projekt 1 (pełny)</div>
          <div>Projekt 2 (w połowie widoczny)</div>
        </div>
        <Link to="/projects">Zobacz wszystkie projekty</Link>
      </section>


    </div>
  );
}

export default Home;
