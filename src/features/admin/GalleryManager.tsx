import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash2, Eye, MoreVertical } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useData } from '../../context/DataContext';

export const GalleryManager = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useData();

  const handleUpload = () => {
    // For demo purposes, adding a new image directly
    const newImage = {
      url: "https://images.unsplash.com/photo-1593702288056-7927b442d0fa?ixlib=rb-4.0.3",
      title: "New Upload",
      date: new Date().toISOString().split('T')[0]
    };
    addGalleryItem(newImage);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Gallery Management</h1>
          <p className="text-gray-400 text-sm">Upload and manage your portfolio images</p>
        </div>
        <Button variant="primary" onClick={handleUpload}>
          <Upload size={18} className="mr-2" />
          Upload Images
        </Button>
      </div>

      {/* Upload Area */}
      <div 
        onClick={handleUpload}
        className="bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border-2 border-dashed border-gold/20 rounded-xl p-8 text-center hover:border-gold/50 hover:bg-gold/5 transition-all cursor-pointer group"
      >
        <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/20 group-hover:scale-110 transition-transform">
          <Upload className="text-gold" size={24} />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Drop images here or click to upload</h3>
        <p className="text-gray-400 text-sm">Support for JPG, PNG. Max file size 5MB.</p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gallery.map((image) => (
          <motion.div 
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative bg-dark rounded-xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all"
          >
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={`${image.url}&auto=format&fit=crop&w=400&q=80`} 
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-xs transition-colors">
                  <Eye size={20} />
                </button>
                <button 
                  className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-500 backdrop-blur-xs transition-colors"
                  onClick={() => deleteGalleryItem(image.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-4 flex justify-between items-start">
              <div>
                <h4 className="font-medium text-white truncate">{image.title}</h4>
                <p className="text-xs text-gray-500">{image.date}</p>
              </div>
              <button className="text-gray-500 hover:text-white">
                <MoreVertical size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
