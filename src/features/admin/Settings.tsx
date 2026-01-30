import React, { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useData } from '../../context/DataContext';

export const Settings = () => {
  const { settings, updateSettings } = useData();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(settings);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateSettings(formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-white">Settings</h1>
          <p className="text-gray-400 text-sm">Configure your website and business settings</p>
        </div>
        <Button variant="primary" onClick={handleSave}>
          {showSuccess ? <Check size={18} className="mr-2" /> : <Save size={18} className="mr-2" />}
          {showSuccess ? 'Saved!' : 'Save Changes'}
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
                name="siteTitle"
                value={formData.siteTitle}
                onChange={handleInputChange}
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tagline</label>
              <input 
                type="text" 
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Address</label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
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
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Facebook URL</label>
              <input 
                type="text" 
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">TikTok URL</label>
              <input 
                type="text" 
                name="tiktok"
                value={formData.tiktok}
                onChange={handleInputChange}
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Twitter/X URL</label>
              <input 
                type="text" 
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
