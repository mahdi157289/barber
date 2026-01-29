import React from 'react';
import { Scissors, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="pt-16 pb-8 px-6 bg-[#050505] border-t border-gold/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Logo and Social Icons (Centered) */}
        <div className="flex flex-col items-center mb-12">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-8 flex items-center justify-center bg-gold rounded text-dark">
              <Scissors size={20} />
            </div>
            <span className="text-4xl font-bold font-serif text-white">ELITE <span className="text-gold">CUTS</span></span>
          </div>
          <p className="text-gray-500 mb-8 leading-relaxed text-center max-w-xl">
            Premium barbershop experience where precision meets style. Your go-to destination for exceptional grooming.
          </p>
          
          {/* Social Icons with Golden Effect */}
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-lg text-dark hover:bg-[#a88620] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(201,162,39,0.5)]">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-lg text-dark hover:bg-[#a88620] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(201,162,39,0.5)]">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-lg text-dark hover:bg-[#a88620] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(201,162,39,0.5)]">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Contact Info Row - Horizontal Layout (3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Location Card */}
          <div className="flex flex-col items-center text-center p-6 bg-linear-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-gold/20 hover:border-gold transition-all duration-300 group">
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center mb-4 text-dark">
              <MapPin size={24} />
            </div>
            <h4 className="font-semibold text-xl text-white mb-3">Location</h4>
            <p className="text-gray-400 leading-relaxed">123 Barber Street, Luxury District<br />New York, NY 10001</p>
          </div>

          {/* Phone & Email Card */}
          <div className="flex flex-col items-center text-center p-6 bg-linear-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-gold/20 hover:border-gold transition-all duration-300 group">
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center mb-4 text-dark">
              <Phone size={24} />
            </div>
            <h4 className="font-semibold text-xl text-white mb-3">Phone & Email</h4>
            <p className="text-gray-400 leading-relaxed">(555) 123-4567</p>
            <p className="text-gray-400 leading-relaxed">info@elitecuts.com</p>
          </div>

          {/* Hours Card */}
          <div className="flex flex-col items-center text-center p-6 bg-linear-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-gold/20 hover:border-gold transition-all duration-300 group">
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center mb-4 text-dark">
              <Clock size={24} />
            </div>
            <h4 className="font-semibold text-xl text-white mb-3">Hours</h4>
            <p className="text-gray-400 leading-relaxed">Mon - Fri: 9AM - 8PM</p>
            <p className="text-gray-400 leading-relaxed">Sat: 9AM - 6PM</p>
            <p className="text-gray-400 leading-relaxed">Sun: 10AM - 4PM</p>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal Links */}
        <div className="border-t border-gold/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-center md:text-left">&copy; {new Date().getFullYear()} Elite Cuts Barbershop. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gold transition-colors">Terms of Service</a>
              <a href="/admin" className="text-gray-500 hover:text-gold transition-colors">Admin Panel</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
