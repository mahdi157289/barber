import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-white">Settings</h1>
          <p className="text-gray-400 text-sm">Configure your website and business settings</p>
        </div>
        <Button variant="primary">
          <Save size={18} className="mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 pb-1">
        {['General', 'Business Info', 'Appearance', 'Notifications'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`pb-3 px-2 text-sm font-medium transition-colors relative ${
              activeTab === tab.toLowerCase() ? 'text-gold' : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
            {activeTab === tab.toLowerCase() && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gold/10 rounded-xl p-8 space-y-8">
        {/* Site Information */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white border-b border-white/5 pb-2">Site Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Site Title</label>
              <input 
                type="text" 
                defaultValue="Elite Cuts Barbershop"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tagline</label>
              <input 
                type="text" 
                defaultValue="Premium Grooming Experience"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white border-b border-white/5 pb-2">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" 
                defaultValue="info@elitecuts.com"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
              <input 
                type="tel" 
                defaultValue="+1 (555) 123-4567"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Address</label>
              <input 
                type="text" 
                defaultValue="123 Barber Street, Luxury District, New York, NY 10001"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white border-b border-white/5 pb-2">Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Instagram URL</label>
              <input 
                type="text" 
                defaultValue="https://instagram.com/elitecuts"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Facebook URL</label>
              <input 
                type="text" 
                defaultValue="https://facebook.com/elitecuts"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
