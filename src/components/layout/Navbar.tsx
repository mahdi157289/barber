import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Scissors, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Button } from '../common/Button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll Spy Logic
      const sections = navLinks.map(link => link.path.substring(1)); // remove #
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection('#' + section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '#services' },
    { name: 'Gallery', path: '#gallery' },
    { name: 'About', path: '#about' },
    { name: 'Contact', path: '#contact' },
  ];

  const leftLinks = navLinks.slice(0, 2);
  const rightLinks = navLinks.slice(2);

  return (
    <>
      {/* Fixed Right Book Button - Visible on Scroll */}
      <button
        onClick={() => (document.getElementById('booking-modal') as HTMLDialogElement)?.showModal()}
        className={clsx(
          "fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 transform origin-right cursor-pointer",
          isScrolled ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-gold text-dark font-bold text-xs py-6 px-2 rounded-l-lg shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_30px_rgba(201,162,39,0.5)] hover:bg-white transition-all flex flex-col items-center gap-3 border-l border-t border-b border-white/20 backdrop-blur-sm">
          <Calendar size={18} className="text-dark" />
          <span className="[writing-mode:vertical-rl] rotate-180 uppercase tracking-widest whitespace-nowrap">Book Now</span>
        </div>
      </button>

      <nav
        className={clsx(
          'fixed top-0 left-0 w-full z-40 transition-all duration-500',
          isScrolled
            ? 'py-5'
            : 'py-8'
        )}
      >
        <div
          className={clsx(
            'container mx-auto px-6 transition-all duration-500 flex items-center',
            isScrolled
              ? 'bg-dark/95 backdrop-blur-md border border-gold/30 rounded-full shadow-lg max-w-4xl py-4 px-12 justify-center'
              : 'bg-transparent justify-between'
          )}
        >
          {/* Logo - Left Side */}
          <Link to="/" className={clsx("flex items-center gap-2 group", isScrolled && "hidden")}>
             <div className="relative w-8 h-8 overflow-hidden rounded bg-gold/10 border border-gold/50 group-hover:border-gold transition-colors">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(201,162,39,0.5)_50%,transparent_75%)] bg-[length:200%_200%] animate-[shimmer_2s_infinite]" />
                <Scissors className="w-full h-full p-1 text-gold" />
             </div>
             <span className="font-serif font-bold text-xl tracking-wider text-white transition-all duration-500 opacity-100 w-auto">
               ELITE <span className="text-gold">CUTS</span>
             </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {!isScrolled ? (
              // Standard Layout
              <>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className={clsx(
                      "text-sm font-medium transition-colors relative group",
                      activeSection === link.path ? "text-gold" : "text-white/90 hover:text-gold"
                    )}
                  >
                    {link.name}
                    <span className={clsx(
                      "absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300",
                      activeSection === link.path ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </a>
                ))}
                <button
                  onClick={() => (document.getElementById('booking-modal') as HTMLDialogElement)?.showModal()}
                  className="px-5 py-2 text-xs font-bold text-dark bg-gold rounded hover:bg-white transition-colors uppercase tracking-widest"
                >
                  Book Now
                </button>
              </>
            ) : (
              // Scrolled Layout - Centered Title
              <>
                {leftLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className={clsx(
                      "text-sm font-medium transition-colors relative group",
                      activeSection === link.path ? "text-gold" : "text-white/90 hover:text-gold"
                    )}
                  >
                    {link.name}
                    <span className={clsx(
                      "absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300",
                      activeSection === link.path ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </a>
                ))}
                
                <Link to="/" className="font-serif font-bold text-xl tracking-wider text-white px-4 hover:scale-105 transition-transform">
                  ELITE <span className="text-gold">CUTS</span>
                </Link>

                {rightLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className={clsx(
                      "text-sm font-medium transition-colors relative group",
                      activeSection === link.path ? "text-gold" : "text-white/90 hover:text-gold"
                    )}
                  >
                    {link.name}
                    <span className={clsx(
                      "absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300",
                      activeSection === link.path ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </a>
                ))}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-darker border-b border-gold/10 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-white hover:text-gold transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-8">
                <div onClick={() => { setIsMobileMenuOpen(false); (document.getElementById('booking-modal') as HTMLDialogElement)?.showModal(); }}>
                  <Button variant="primary">Book Now</Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
};
