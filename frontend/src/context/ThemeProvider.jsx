// frontend/src/context/ThemeProvider.jsx
import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

export default function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true); // domyślnie dark

  // Ustaw atrybut data-theme w <html>
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
