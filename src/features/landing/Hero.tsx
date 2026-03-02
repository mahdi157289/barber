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
          <div className="flex flex-col md:flex-row items-center lg:items-start gap-6 mb-8 uppercase">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-gold/50 shadow-[0_0_30px_rgba(201,162,39,0.3)] shrink-0"
            >
              <img src={logo} alt="Elite Cuts Logo" className="w-full h-full object-cover" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">{settings.siteTitle}</span>
            </h1>
          </div>

          {/* Social Rectangles replacing tagline and description */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-xl mx-auto lg:mx-0">
            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center gap-3 p-4 bg-dark/40 border border-gold/20 rounded-xl hover:border-gold transition-all duration-300 hover:bg-gold/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1877f2]/0 via-[#1877f2]/10 to-[#1877f2]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <svg className="w-6 h-6 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              <span className="text-white font-medium">Facebook</span>
            </a>
            <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center gap-3 p-4 bg-dark/40 border border-gold/20 rounded-xl hover:border-gold transition-all duration-300 hover:bg-gold/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
              <span className="text-white font-medium">TikTok</span>
            </a>
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center gap-3 p-4 bg-dark/40 border border-gold/20 rounded-xl hover:border-gold transition-all duration-300 hover:bg-gold/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#bc1888]/0 via-[#bc1888]/10 to-[#bc1888]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <svg className="w-6 h-6 text-[#bc1888]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              <span className="text-white font-medium">Instagram</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Button variant="primary" size="lg" onClick={() => (document.getElementById('booking-modal') as HTMLDialogElement)?.showModal()}>
              {t('hero.bookAppointment')}
            </Button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative overflow-hidden px-8 py-4 bg-transparent border-2 border-gold text-gold font-bold uppercase tracking-widest rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,162,39,0.3)]"
            >
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
              <span className="relative z-10">Store</span>
            </motion.button>
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
