import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, User, X, Instagram } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useData, type Worker } from '../../context/DataContext';

export const TeamManager = () => {
  const { workers, addWorker, updateWorker, deleteWorker } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    bio: '',
    instagram: ''
  });

  const filteredWorkers = workers.filter(worker => 
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (worker?: Worker) => {
    if (worker) {
      setEditingWorker(worker);
      setFormData({
        name: worker.name,
        role: worker.role,
        image: worker.image,
        bio: worker.bio,
        instagram: worker.instagram || ''
      });
    } else {
      setEditingWorker(null);
      setFormData({
        name: '',
        role: '',
        image: 'https://images.unsplash.com/photo-1583900985315-953be81153bc?ixlib=rb-4.0.3', // Default placeholder
        bio: '',
        instagram: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWorker) {
      updateWorker(editingWorker.id, formData);
    } else {
      addWorker(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Team Management</h1>
          <p className="text-gray-400 text-sm">Manage your barbers and staff members</p>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus size={18} className="mr-2" />
          Add New Member
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] p-4 rounded-xl border border-gold/10 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search team members..." 
            className="w-full bg-dark/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-gold focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => (
          <div key={worker.id} className="bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gold/10 rounded-xl overflow-hidden group">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img 
                src={worker.image} 
                alt={worker.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => handleOpenModal(worker)}
                  className="p-2 bg-gold text-dark rounded-full hover:bg-white transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => deleteWorker(worker.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{worker.name}</h3>
                  <p className="text-gold text-xs uppercase tracking-wider">{worker.role}</p>
                </div>
                {worker.instagram && (
                  <a href={`https://instagram.com/${worker.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold">
                    <Instagram size={18} />
                  </a>
                )}
              </div>
              <p className="text-gray-400 text-sm line-clamp-2">{worker.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="bg-[#1a1a1a] border border-gold/20 rounded-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {editingWorker ? 'Edit Team Member' : 'Add New Member'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Role / Position</label>
                <input 
                  type="text" 
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                  placeholder="e.g. Master Barber"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Photo URL</label>
                <input 
                  type="url" 
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Instagram Username (Optional)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                  <input 
                    type="text" 
                    value={formData.instagram}
                    onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                    className="w-full bg-dark border border-white/10 rounded-lg pl-8 p-3 text-white focus:border-gold focus:outline-none"
                    placeholder="username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Bio</label>
                <textarea 
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none min-h-[100px]"
                  placeholder="Brief description about the team member..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingWorker ? 'Save Changes' : 'Add Member'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
