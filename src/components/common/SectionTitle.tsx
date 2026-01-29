import React from 'react';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';
import clsx from 'clsx';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  className?: string;
  alignment?: 'left' | 'center' | 'right';
  centered?: boolean; // Kept for backward compatibility
}

export const SectionTitle = ({ 
  subtitle, 
  title, 
  className, 
  alignment = 'center',
  centered 
}: SectionTitleProps) => {
  // Determine final alignment: prefer 'alignment' prop, fallback to 'centered' prop
  const finalAlignment = centered !== undefined ? (centered ? 'center' : 'left') : alignment;

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={clsx("mb-16", alignmentClasses[finalAlignment], className)}>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-gold uppercase tracking-[0.2em] text-sm font-semibold mb-3"
      >
        {subtitle}
      </motion.p>
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 relative inline-block"
      >
        {title}
      </motion.h2>

      {/* Decorative Element */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={clsx(
          "flex items-center gap-4",
          finalAlignment === 'center' ? "justify-center" : 
          finalAlignment === 'right' ? "justify-end" : "justify-start"
        )}
      >
        <span className="h-[1px] w-12 md:w-24 bg-linear-to-r from-transparent via-gold to-transparent opacity-50" />
        <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center bg-dark relative">
            <Scissors size={14} className="text-gold -rotate-45" />
        </div>
        <span className="h-[1px] w-12 md:w-24 bg-linear-to-r from-transparent via-gold to-transparent opacity-50" />
      </motion.div>
    </div>
  );
};
