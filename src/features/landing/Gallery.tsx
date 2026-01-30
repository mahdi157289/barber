import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '../../components/common/SectionTitle';
import { useData } from '../../context/DataContext';

export const Gallery = () => {
  const { gallery } = useData();
  const { t } = useTranslation();

  return (
    <section id="gallery" className="py-24 bg-dark relative">
      <div className="container mx-auto px-6">
        <SectionTitle 
          subtitle={t('gallery.subtitle')} 
          title={t('gallery.title')} 
        />
        <p className="text-gray-500 max-w-2xl mx-auto text-center -mt-8 mb-16">{t('gallery.description')}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-darker"
            >
              {/* Image */}
              <img 
                src={`${img.url}&auto=format&fit=crop&w=400&q=80`}
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
