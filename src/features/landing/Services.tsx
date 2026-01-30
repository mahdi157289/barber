import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../../components/common/SectionTitle';
import { ServiceCard } from '../../components/common/ServiceCard';
import { useData } from '../../context/DataContext';
import { useTranslation } from 'react-i18next';

export const Services = () => {
  const { t } = useTranslation();
  const { services } = useData();
  
  // Helper to map context service to card props (adding image if missing)
  const getServiceImage = (id: number) => {
    const images = [
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop", 
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=400&h=300&fit=crop"
    ];
    return images[id % images.length];
  };

  return (
    <section id="services" className="py-24 bg-darker relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle 
          subtitle={t('services.subtitle')}
          title={t('services.title')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id}
              title={t(`services.items.${service.id}.title`, service.title)}
              price={service.price}
              duration={service.duration}
              description={t(`services.items.${service.id}.description`, service.description)}
              image={getServiceImage(service.id)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
