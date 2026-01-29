import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../../components/common/SectionTitle';
import { Star, Quote } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Testimonials = () => {
  const { testimonials } = useData();
  
  // Only show approved testimonials
  const approvedTestimonials = testimonials.filter(t => t.status === 'Approved');
  
  // Helper to generate initials if missing
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <section id="testimonials" className="py-24 bg-darker relative">
      <div className="container mx-auto px-6">
        <SectionTitle 
          subtitle="Testimonials"
          title="What Our Clients Say"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {approvedTestimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-linear-to-b from-[#1a1a1a] to-[#0d0d0d] p-8 rounded-2xl border border-gold/20 hover:border-gold transition-colors duration-300 relative group"
            >
              <div className="absolute top-6 right-6 text-gold/20 group-hover:text-gold/40 transition-colors">
                <Quote size={40} />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed italic">"{item.content}"</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-dark font-bold text-lg">
                  {getInitials(item.name)}
                </div>
                <div>
                  <h4 className="text-white font-medium">{item.name}</h4>
                  <p className="text-gold/60 text-sm">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
