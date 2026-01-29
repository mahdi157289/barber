import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const text = "Hykel Barber Shop ...";
  const [index, setIndex] = useState(0);
  const [showScissors, setShowScissors] = useState(false);
  const [cutComplete, setCutComplete] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 50); // Much faster typing (approx 1s total)
      return () => clearTimeout(timeout);
    } else {
      // Typing finished, start cut sequence
      const timeout = setTimeout(() => {
        setShowScissors(true);
      }, 200); // Short pause
      return () => clearTimeout(timeout);
    }
  }, [index, text.length]);

  // Handle cut completion
  useEffect(() => {
    if (showScissors) {
      // Scissors take ~1s to cut across
      const timeout = setTimeout(() => {
        setCutComplete(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [showScissors]);

  // Handle final exit
  useEffect(() => {
    if (cutComplete) {
      // Wait for split animation to finish (0.6s)
      const timeout = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [cutComplete, onComplete]);

  // Split Text Component to ensure alignment
  const SplitText = () => (
    <div className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-widest whitespace-nowrap uppercase">
      <span className="text-white">
        {text.slice(0, Math.min(index, 12))}
      </span>
      <span className="text-gold">
        {index > 12 ? text.slice(12, index) : ''}
      </span>
      {index < text.length && <span className="animate-pulse text-gold">|</span>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Top Half */}
      <motion.div
        initial={{ y: 0 }}
        animate={cutComplete ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full h-1/2 bg-black overflow-hidden border-b border-gold/10 z-50 pointer-events-auto flex items-end justify-center pb-4"
      >
        <SplitText />
      </motion.div>

      {/* Bottom Half */}
      <motion.div
        initial={{ y: 0 }}
        animate={cutComplete ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed bottom-0 left-0 w-full h-1/2 bg-black overflow-hidden border-t border-gold/10 z-50 pointer-events-auto"
      >
      </motion.div>

      {/* Scissors Animation */}
      <AnimatePresence>
        {showScissors && !cutComplete && (
          <motion.div
            initial={{ left: "-10%", top: "50%", opacity: 1 }}
            animate={{ left: "110%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="fixed z-[60] text-gold"
            style={{ transform: 'translateY(-50%)' }}
          >
            <Scissors size={48} className="text-gold fill-gold/20" />
            {/* Cut Line Trail */}
            <div className="absolute top-1/2 right-full h-0.5 bg-gold/50 w-[200vw] -translate-y-1/2" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
