import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggle = () => {
    setLanguage(prev => (prev === 'pl' ? 'en' : 'pl'));
  };

  return <button onClick={toggle}>{language === 'pl' ? '🇬🇧 English' : '🇵🇱 Polski'}</button>;
}

export default LanguageSwitcher;
