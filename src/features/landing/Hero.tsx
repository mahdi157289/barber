import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Scene } from '../../components/3d/Scene';
import { Button } from '../../components/common/Button';
import { Calendar, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/factory coif logo.jpg';

const particles = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 1,
  duration: 15 + Math.random() * 20,
  delay: Math.random() * 20
}));

export const Hero = () => {
  const { t } = useTranslation();
  const { settings } = useData();

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-[#151525] to-dark"></div>
        {/* Rotating Gradient Overlay */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(201,162,39,0.08)_0%,transparent_50%)] animate-[spin_20s_linear_infinite]"></div>

        {/* Floating Bubbles (Upward) */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute bg-gold/40 rounded-full"
              style={{
                left: particle.left,
                width: particle.size,
                height: particle.size,
              }}
              initial={{ top: "110%" }}
              animate={{ top: "-10%" }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear",
                delay: -particle.delay // Negative delay to simulate pre-existing motion
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight flex flex-col items-center lg:items-start gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-gold/50 shadow-[0_0_30px_rgba(201,162,39,0.3)] mb-4"
            >
              <img src={logo} alt="Elite Cuts Logo" className="w-full h-full object-cover" />
            </motion.div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold uppercase">{settings.siteTitle}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-8 tracking-widest uppercase">
            {settings.tagline}
          </p>

          <p className="text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Button variant="primary" size="lg" onClick={() => (document.getElementById('booking-modal') as HTMLDialogElement)?.showModal()}>
              {t('hero.bookAppointment')}
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('hero.ourServices')}
            </Button>
          </div>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-125 lg:h-175 w-full relative"
        >
          <div className="absolute inset-0 z-10 pointer-events-none bg-radial-gradient from-transparent to-dark/20" />
          <Scene />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest text-xs">{t('hero.scrollDown')}</p>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-0.5 h-16 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
};
