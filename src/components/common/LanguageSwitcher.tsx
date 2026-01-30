import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇹🇳' }
  ];

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="fixed right-6 top-40 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gold rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.4)] hover:scale-110 group"
        >
          <Globe className="w-6 h-6 text-gold group-hover:rotate-12 transition-transform duration-300" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-16 top-0 bg-[#1a1a1a] border border-gold/20 rounded-xl overflow-hidden shadow-2xl min-w-[150px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-gold/10 transition-colors flex items-center gap-3 ${
                    i18n.language === lang.code ? 'text-gold' : 'text-gray-300'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium text-sm">{lang.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
