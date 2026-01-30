import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../../components/common/SectionTitle';
import { Button } from '../../components/common/Button';
import { useData } from '../../context/DataContext';
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();
  const { settings } = useData();

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-gold/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-linear-to-r from-gold/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gold/10 transform translate-x-4 translate-y-4 rounded-lg border border-gold/20" />
              <img 
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Master Barber at work" 
                className="relative rounded-lg shadow-2xl w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute -bottom-8 -right-8 bg-gold p-8 rounded-lg shadow-xl max-w-[200px] hidden md:block">
                <p className="text-dark text-4xl font-bold font-serif">15+</p>
                <p className="text-dark font-semibold text-sm uppercase tracking-wider mt-1">{t('about.yearsExperience')}</p>
              </div>
            </div>
          </motion.div>
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <SectionTitle 
              subtitle={t('about.subtitle')}
              title={t('about.title')}
              alignment="left"
            />
            
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                {t('about.description1', { siteTitle: settings.siteTitle })}
              </p>
              
              <p className="text-lg leading-relaxed">
                {t('about.description2')}
              </p>
              
              <div className="grid grid-cols-2 gap-8 py-6">
                <div className="text-center p-6 bg-[#1a1a1a] rounded-lg border border-white/5">
                  <p className="text-3xl font-bold text-gold mb-1">5000+</p>
                  <p className="text-sm text-gray-400">{t('about.happyClients')}</p>
                </div>
                <div className="text-center p-6 bg-[#1a1a1a] rounded-lg border border-white/5">
                  <p className="text-3xl font-bold text-gold mb-1">4.9</p>
                  <p className="text-sm text-gray-400">{t('about.rating')} ⭐</p>
                </div>
              </div>
              
              <Button variant="primary" onClick={() => (document.getElementById('booking-modal') as HTMLDialogElement)?.showModal()}>
                {t('about.bookVisit')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
