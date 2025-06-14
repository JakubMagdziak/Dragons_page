import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

function ThemeToggle() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '🌞 Jasny' : '🌙 Ciemny'}
    </button>
  );
}

export default ThemeToggle;