import { useState } from 'react';
import { LanguageContext } from './LanguageContext';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (en, hi) => (language === 'hi' ? hi : en);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
