import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import React from 'react';


import './styles/global.css';
import './styles/variables.css';


function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Navbar />
        <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
