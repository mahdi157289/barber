import { motion } from 'framer-motion';
import { SectionTitle } from '../../components/common/SectionTitle';
import { Heart, MessageCircle, Share2, Music, MoreHorizontal } from 'lucide-react';

const instagramImages = [
  {
    src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=300&h=300&fit=crop",
    alt: "Instagram 1",
    likes: "1.2K"
  },
  {
    src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=300&fit=crop",
    alt: "Instagram 2",
    likes: "2.4K"
  },
  {
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=300&fit=crop",
    alt: "Instagram 3",
    likes: "987"
  },
  {
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=300&h=300&fit=crop",
    alt: "Instagram 4",
    likes: "3.1K"
  },
  {
    src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=300&fit=crop",
    alt: "Instagram 5",
    likes: "1.8K"
  },
  {
    src: "https://images.unsplash.com/photo-1593702288056-7927b442d0fa?w=300&h=300&fit=crop",
    alt: "Instagram 6",
    likes: "2.9K"
  }
];

export const SocialMedia = () => {
  return (
    <section className="py-20 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionTitle 
            subtitle="Stay Connected" 
            title="Follow Us On" 
            highlight="Social Media"
            alignment="center"
          />
          <p className="text-gray-500 max-w-2xl mx-auto mt-6">
            Stay updated with our latest cuts, behind-the-scenes content, and exclusive offers. Join our growing community!
          </p>
        </div>

        {/* Instagram Feed Preview */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2 font-playfair">Latest From <span className="text-gold">Instagram</span></h3>
          <p className="text-gray-500">Check out our recent work and updates</p>
        </div>

        {/* Instagram Feed Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-16">
          {instagramImages.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-lg font-bold flex items-center gap-1">
                  <Heart className="w-5 h-5 fill-white" /> {img.likes}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Instagram Card */}
          <a href="#" className="group relative bg-linear-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-2xl p-8 border border-gold/20 hover:border-gold transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(201,162,39,0.2)] overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-linear-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-1 font-playfair">Instagram</h4>
              <p className="text-gray-500 text-sm mb-3">@elitecuts_barber</p>
              <span className="text-gold font-semibold text-lg">25.4K</span>
              <span className="text-gray-500 text-xs block">Followers</span>
            </div>
          </a>

          {/* Facebook Card */}
          <a href="#" className="group relative bg-linear-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-2xl p-8 border border-gold/20 hover:border-gold transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(201,162,39,0.2)] overflow-hidden">
            <div className="absolute inset-0 bg-[#1877f2] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#1877f2] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-1 font-playfair">Facebook</h4>
              <p className="text-gray-500 text-sm mb-3">Elite Cuts Barber</p>
              <span className="text-gold font-semibold text-lg">18.2K</span>
              <span className="text-gray-500 text-xs block">Followers</span>
            </div>
          </a>

          {/* TikTok Card */}
          <a href="#" className="group relative bg-linear-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-2xl p-8 border border-gold/20 hover:border-gold transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(201,162,39,0.2)] overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-[#00f2ea] to-[#ff0050] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg border border-gray-700">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-1 font-playfair">TikTok</h4>
              <p className="text-gray-500 text-sm mb-3">@elitecuts</p>
              <span className="text-gold font-semibold text-lg">42.8K</span>
              <span className="text-gray-500 text-xs block">Followers</span>
            </div>
          </a>

        </div>

        {/* Follow Button CTA */}
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center gap-3 px-10 py-4 bg-transparent border-2 border-gold text-gold font-semibold uppercase tracking-widest hover:bg-gold hover:text-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(201,162,39,0.3)]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/><circle cx="12" cy="12" r="3.5"/></svg>
            Follow @elitecuts_barber
          </a>
        </div>
      </div>
    </section>
  );
};
