import React from 'react';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminToggle = () => {
  const { t } = useTranslation();
  return (
    <Link
      to="/admin"
      className="fixed right-6 top-24 w-14 h-14 bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gold rounded-full flex items-center justify-center shadow-lg z-[9999] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.4)] hover:scale-110 group"
      title={t('footer.admin')}
    >
      <Settings className="w-6 h-6 text-gold group-hover:rotate-90 transition-transform duration-300" />
      <span className="absolute right-16 bg-dark text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gold">
        {t('footer.admin')}
      </span>
    </Link>
  );
};

export default AdminToggle;
