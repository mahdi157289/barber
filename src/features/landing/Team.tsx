import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '../../components/common/SectionTitle';
import { useData } from '../../context/DataContext';

export const Team = () => {
  const { workers } = useData();
  const { t } = useTranslation();

  return (
    <section id="team" className="py-24 bg-dark relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />
        </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle 
          subtitle={t('team.subtitle')} 
          title={t('team.title')} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {workers.map((worker, index) => (
            <motion.div 
              key={worker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10" />
                <img 
                  src={worker.image} 
                  alt={worker.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Social Overlay */}
                {worker.instagram && (
                  <div className="absolute bottom-4 right-4 z-20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <a 
                      href={`https://instagram.com/${worker.instagram}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-dark transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                  </div>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">{worker.name}</h3>
                <p className="text-gold text-sm font-medium uppercase tracking-wider mb-3">{t(`team.members.${worker.id}.role`, worker.role)}</p>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{t(`team.members.${worker.id}.bio`, worker.bio)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
