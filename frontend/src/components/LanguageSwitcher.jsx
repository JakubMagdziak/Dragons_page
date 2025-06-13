import React, { useState } from 'react';
import { LanguageContext } from './../context/LanguageContext';

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pl');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
