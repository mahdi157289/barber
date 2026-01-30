import React from 'react';
import { Scissors, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';

export const Footer = () => {
  const { settings } = useData();
  const { t } = useTranslation();
  const titleParts = settings.siteTitle.split(' ');
  const titleFirst = titleParts[0];
  const titleRest = titleParts.slice(1).join(' ');

  return (
    <footer className="pt-16 pb-8 px-6 bg-[#050505] border-t border-gold/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Logo and Social Icons (Centered) */}
        <div className="flex flex-col items-center mb-12">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-8 flex items-center justify-center bg-gold rounded text-dark">
              <Scissors size={20} />
            </div>
            <span className="text-4xl font-bold font-serif text-white">{titleFirst} <span className="text-gold">{titleRest}</span></span>
          </div>
          <p className="text-gray-500 mb-8 leading-relaxed text-center max-w-xl">
            {settings.tagline}
          </p>
          
          {/* Social Icons with Golden Effect */}
          <div className="flex gap-4">
            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-lg text-dark hover:bg-[#a88620] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(201,162,39,0.5)]">
                <Facebook size={20} />
              </a>
            )}
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-lg text-dark hover:bg-[#a88620] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(201,162,39,0.5)]">
                <Instagram size={20} />
              </a>
            )}
            {/* Twitter/X is not in settings, leaving hardcoded or removing? Keeping hardcoded placeholder for now or removing if not in settings. Since it's not in settings, I'll maybe hide it or leave it. The user didn't ask to remove it. I'll leave it but maybe comment it out or just leave as is? The prompt implies "no changes saved", so they probably edited existing fields. I'll stick to updating the fields that ARE in settings. */}
            {settings.twitter && (
              <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-lg text-dark hover:bg-[#a88620] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(201,162,39,0.5)]">
                <Twitter size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Contact Info Row - Horizontal Layout (3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Location Card */}
          <div className="flex flex-col items-center text-center p-6 bg-linear-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-gold/20 hover:border-gold transition-all duration-300 group">
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center mb-4 text-dark">
              <MapPin size={24} />
            </div>
            <h4 className="font-semibold text-xl text-white mb-3">{t('footer.location')}</h4>
            <p className="text-gray-400 leading-relaxed whitespace-pre-line">{settings.address}</p>
          </div>

          {/* Phone & Email Card */}
          <div className="flex flex-col items-center text-center p-6 bg-linear-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-gold/20 hover:border-gold transition-all duration-300 group">
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center mb-4 text-dark">
              <Phone size={24} />
            </div>
            <h4 className="font-semibold text-xl text-white mb-3">{t('footer.phoneEmail')}</h4>
            <p className="text-gray-400 leading-relaxed">{settings.phone}</p>
            <p className="text-gray-400 leading-relaxed">{settings.email}</p>
          </div>

          {/* Hours Card */}
          <div className="flex flex-col items-center text-center p-6 bg-linear-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-gold/20 hover:border-gold transition-all duration-300 group">
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center mb-4 text-dark">
              <Clock size={24} />
            </div>
            <h4 className="font-semibold text-xl text-white mb-3">{t('footer.hours')}</h4>
            <p className="text-gray-400 leading-relaxed">{t('footer.weekdays')}</p>
            <p className="text-gray-400 leading-relaxed">{t('footer.saturday')}</p>
            <p className="text-gray-400 leading-relaxed">{t('footer.sunday')}</p>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal Links */}
        <div className="border-t border-gold/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-center md:text-left">&copy; {new Date().getFullYear()} {settings.siteTitle}. {t('footer.rightsReserved')}</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-gold transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="text-gray-500 hover:text-gold transition-colors">{t('footer.terms')}</a>
              <a href="/admin" className="text-gray-500 hover:text-gold transition-colors">{t('footer.admin')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
