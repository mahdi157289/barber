import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '../../components/common/SectionTitle';
import { Button } from '../../components/common/Button';
import { Mail, User, Phone, MessageSquare, Clock, Shield, CheckCircle, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Contact = () => {
  const { addMessage } = useData();
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add message to context
    addMessage({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      subject: formState.subject,
      message: formState.message
    });

    console.log('Form submitted:', formState);
    alert(t('contact.success'));
    setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-linear-to-b from-[#0f0f0f] to-[#0a0a0a] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold opacity-5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header with Icon */}
        <div className="text-center mb-14">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-gold to-[#a88620] rounded-full mb-6 shadow-[0_0_40px_rgba(201,162,39,0.3)]"
          >
            <Mail className="w-10 h-10 text-dark" />
          </motion.div>
          
          <SectionTitle 
            subtitle={t('contact.subtitle')}
            title={t('contact.title')}
            alignment="center"
          />
          
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mt-4">
            {t('contact.description')}
          </p>
        </div>

        {/* Form Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-linear-to-b from-[#1a1a1a] to-[#0d0d0d] p-8 md:p-12 rounded-3xl border border-gold/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-gold/40 transition-all duration-500 relative overflow-hidden group"
        >
          {/* Card Inner Glow Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-gold to-transparent opacity-50"></div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Row 1: Name & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group/input">
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-3 font-medium">
                  <User className="w-4 h-4 text-gold" />
                  {t('contact.form.name')} <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.placeholders.name')} 
                    className="w-full bg-white/5 border border-gold/20 rounded-xl pl-5 pr-12 py-4 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 placeholder:text-gray-600" 
                    required 
                  />
                </div>
              </div>
              
              <div className="group/input">
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-3 font-medium">
                  <Mail className="w-4 h-4 text-gold" />
                  {t('contact.form.email')} <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.placeholders.email')} 
                    className="w-full bg-white/5 border border-gold/20 rounded-xl pl-5 pr-12 py-4 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 placeholder:text-gray-600" 
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Phone & Subject */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group/input">
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-3 font-medium">
                  <Phone className="w-4 h-4 text-gold" />
                  {t('contact.form.phone')}
                </label>
                <div className="relative">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder={t('contact.form.placeholders.phone')} 
                    className="w-full bg-white/5 border border-gold/20 rounded-xl pl-5 pr-12 py-4 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 placeholder:text-gray-600" 
                  />
                </div>
              </div>
              
              <div className="group/input">
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-3 font-medium">
                  <MessageSquare className="w-4 h-4 text-gold" />
                  {t('contact.form.subject')}
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder={t('contact.form.placeholders.subject')} 
                    className="w-full bg-white/5 border border-gold/20 rounded-xl pl-5 pr-12 py-4 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 placeholder:text-gray-600" 
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Message */}
            <div className="group/input">
              <label className="flex items-center gap-2 text-sm text-gray-300 mb-3 font-medium">
                <MessageSquare className="w-4 h-4 text-gold" />
                {t('contact.form.message')} <span className="text-gold">*</span>
              </label>
              <textarea 
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder={t('contact.form.placeholders.message')} 
                rows={6} 
                className="w-full bg-white/5 border border-gold/20 rounded-xl pl-5 pr-5 py-4 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 placeholder:text-gray-600 resize-none" 
                required
              ></textarea>
              <p className="text-gray-600 text-xs mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {t('contact.form.responseTime')}
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button type="submit" className="w-full bg-gold hover:bg-[#a88620] text-dark font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-gold/20">
                <span>{t('contact.form.send')}</span>
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-gold/10">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Shield className="w-5 h-5 text-gold" />
                <span>{t('contact.trust.secure')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <CheckCircle className="w-5 h-5 text-gold" />
                <span>{t('contact.trust.quick')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Star className="w-5 h-5 text-gold" />
                <span>{t('contact.trust.rating')}</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
