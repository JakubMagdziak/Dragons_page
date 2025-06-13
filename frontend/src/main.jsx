import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import LanguageProvider from './context/LanguageContext.jsx';
import ThemeProvider from './context/ThemeProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
