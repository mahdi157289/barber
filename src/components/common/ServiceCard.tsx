import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Scissors } from 'lucide-react';

interface ServiceProps {
  title: string;
  price: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  duration?: string;
  delay?: number;
}

export const ServiceCard = ({ title, price, description, icon, image, duration, delay = 0 }: ServiceProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full"
    >
      <div 
        className="h-full bg-dark/50 backdrop-blur-sm border border-gold/20 rounded-xl p-6 group hover:border-gold transition-colors duration-500 relative overflow-hidden flex flex-col"
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shine Effect */}
        <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-transform duration-1000 ease-in-out z-20 pointer-events-none" />

        {/* Image */}
        {image && (
          <div className="w-full h-48 rounded-lg overflow-hidden mb-6 shrink-0 relative z-10">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col grow items-center text-center transform transition-transform duration-500 group-hover:translate-z-12">
            {!image && (
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-gold to-yellow-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gold/20">
                  {icon || <Scissors size={28} className="text-darker" />}
              </div>
            )}
            
            <h3 className="text-2xl font-serif font-bold text-white mb-2">{title}</h3>
            
            <p className="text-gray-400 mb-6 text-sm leading-relaxed grow">
                {description}
            </p>

            <div className="flex justify-between items-center w-full mt-auto mb-6 px-2">
                <span className="text-2xl font-bold text-gold">{price}</span>
                {duration && <span className="text-gray-500">{duration}</span>}
            </div>
            
            <button 
                onClick={() => (document.getElementById('booking-modal') as HTMLDialogElement)?.showModal()}
                className="w-full py-3 bg-gold text-dark font-bold rounded hover:bg-white transition-colors duration-300 uppercase tracking-wider text-sm relative overflow-hidden group/btn"
            >
                <span className="relative z-10">Book Now</span>
                {/* Glare/Flare Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-in-out" />
            </button>
        </div>
      </div>
    </motion.div>
  );
};
