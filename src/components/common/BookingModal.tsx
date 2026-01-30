import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Scissors, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { useData } from '../../context/DataContext';
import clsx from 'clsx';

export const BookingModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { addBooking, isTimeSlotAvailable } = useData();
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: new Date().toLocaleDateString('en-CA'),
    time: '',
    name: '',
    phone: '',
    email: ''
  });

  const close = () => {
    dialogRef.current?.close();
    setStep(1);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = formData.service.split(' - ')[1] || "$0";
    
    // Add booking to context
    addBooking({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      date: formData.date,
      time: formData.time,
      price
    });

    console.log('Booking submitted:', formData);
    alert(t('booking.success'));
    close();
  };

  const services = [
    { id: 'classic', price: 30 },
    { id: 'beard', price: 20 },
    { id: 'full', price: 50 },
    { id: 'kids', price: 25 }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM"
  ];

  const next14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <dialog 
      id="booking-modal" 
      ref={dialogRef}
      className="m-auto bg-transparent backdrop:bg-black/80 p-0 rounded-2xl shadow-2xl w-full max-w-2xl open:animate-in open:fade-in open:zoom-in-95 backdrop:animate-in backdrop:fade-in"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
    >
      <div className="bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gold/20 rounded-2xl overflow-hidden relative text-white">
        <button 
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 bg-darker p-8 border-b md:border-b-0 md:border-r border-gold/10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-serif text-gold mb-2">{t('booking.title')}</h2>
              <p className="text-gray-400 text-sm">{t('booking.step', { step })}</p>
              
              <div className="mt-8 space-y-4">
                <div className={`flex items-center gap-3 ${step >= 1 ? 'text-white' : 'text-gray-600'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-gold bg-gold/10 text-gold' : 'border-gray-700 bg-transparent'}`}>1</div>
                  <span className="text-sm font-medium">{t('booking.steps.serviceDate')}</span>
                </div>
                <div className={`flex items-center gap-3 ${step >= 2 ? 'text-white' : 'text-gray-600'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-gold bg-gold/10 text-gold' : 'border-gray-700 bg-transparent'}`}>2</div>
                  <span className="text-sm font-medium">{t('booking.steps.time')}</span>
                </div>
                <div className={`flex items-center gap-3 ${step >= 3 ? 'text-white' : 'text-gray-600'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= 3 ? 'border-gold bg-gold/10 text-gold' : 'border-gray-700 bg-transparent'}`}>3</div>
                  <span className="text-sm font-medium">{t('booking.steps.details')}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gold/10">
              <p className="text-xs text-gray-500">
                {t('booking.help')}<br />
                <span className="text-gold font-medium text-sm">+1 (555) 123-4567</span>
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-2/3 p-8">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              <div className="flex-1">
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-medium mb-6 flex items-center gap-2">
                      <Scissors className="text-gold" size={20} />
                      {t('booking.selectService')}
                    </h3>
                    
                    <div className="space-y-3">
                      {services.map((service) => {
                        // @ts-ignore
                        const serviceLabel = `${t(`booking.servicesList.${service.id}`)} - $${service.price}`;
                        return (
                          <label 
                            key={service.id}
                            className={`block p-4 rounded-lg border cursor-pointer transition-all ${
                              formData.service === serviceLabel 
                                ? 'border-gold bg-gold/10' 
                                : 'border-white/10 hover:border-gold/50 hover:bg-white/5'
                            }`}
                          >
                            <input 
                              type="radio" 
                              name="service" 
                              value={serviceLabel}
                              checked={formData.service === serviceLabel}
                              onChange={(e) => setFormData({...formData, service: e.target.value})}
                              className="hidden"
                            />
                            <span className="text-sm font-medium">{serviceLabel}</span>
                          </label>
                        );
                      })}
                    </div>

                    <div className="mt-6">
                      <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                        <Calendar className="text-gold" size={20} />
                        {t('booking.selectDate')}
                      </h3>
                      
                      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-white/5">
                        {next14Days.map((date) => {
                          const dateStr = date.toLocaleDateString('en-CA');
                          const isSelected = formData.date === dateStr;
                          
                          return (
                            <button
                              key={dateStr}
                              type="button"
                              onClick={() => setFormData({...formData, date: dateStr, time: ''})}
                              className={clsx(
                                "min-w-[80px] p-3 rounded-xl border transition-all flex flex-col items-center gap-1",
                                isSelected 
                                  ? "bg-gold border-gold text-dark" 
                                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-gold/30"
                              )}
                            >
                              <span className="text-xs uppercase font-medium">{date.toLocaleDateString(i18n.language, { weekday: 'short' })}</span>
                              <span className="text-xl font-bold">{date.getDate()}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-medium mb-6 flex items-center gap-2">
                      <Clock className="text-gold" size={20} />
                      {t('booking.selectTime')}
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((time) => {
                        const isAvailable = isTimeSlotAvailable(formData.date, time);
                        const isSelected = formData.time === time;
                        
                        return (
                          <button
                            key={time}
                            type="button"
                            disabled={!isAvailable}
                            onClick={() => setFormData({...formData, time})}
                            className={clsx(
                              "p-3 rounded-lg border text-sm font-medium transition-all relative overflow-hidden",
                              isSelected
                                ? "border-gold bg-gold text-dark"
                                : isAvailable 
                                  ? "border-white/10 hover:border-gold/50 hover:bg-white/5 text-white"
                                  : "border-red-500/20 bg-red-500/10 text-red-500/50 cursor-not-allowed"
                            )}
                          >
                            {time}
                            {!isAvailable && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                                <X size={16} className="text-red-500 font-bold" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-medium mb-6 flex items-center gap-2">
                      <User className="text-gold" size={20} />
                      {t('booking.steps.details')}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">{t('booking.form.name')}</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                          placeholder={t('contact.form.placeholders.name')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">{t('booking.form.phone')}</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                          placeholder={t('contact.form.placeholders.phone')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">{t('booking.form.email')}</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                          placeholder={t('contact.form.placeholders.email')}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
                {step > 1 ? (
                  <Button variant="outline" onClick={() => setStep(step - 1)} type="button">
                    {t('booking.back')}
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {step < 3 ? (
                  <Button 
                    variant="primary" 
                    onClick={handleNext} 
                    type="button"
                    disabled={
                      (step === 1 && (!formData.service || !formData.date)) ||
                      (step === 2 && !formData.time)
                    }
                  >
                    {t('booking.next')}
                  </Button>
                ) : (
                  <Button variant="primary" type="submit">
                    {t('booking.confirm')}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};
