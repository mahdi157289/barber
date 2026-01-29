import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Scissors } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useData } from '../../context/DataContext';

export const ServicesManager = () => {
  const { services, addService, deleteService } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddService = () => {
    // For demo purposes, adding a new service directly
    const newService = {
      title: "New Premium Service",
      price: "$60",
      duration: "50 min",
      description: "A newly added premium service description.",
      features: ["Feature 1", "Feature 2"]
    };
    addService(newService);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Services Management</h1>
          <p className="text-gray-400 text-sm">Manage your service offerings and pricing</p>
        </div>
        <Button variant="primary" onClick={handleAddService}>
          <Plus size={18} className="mr-2" />
          Add New Service
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] p-4 rounded-xl border border-gold/10 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search services..." 
            className="w-full bg-dark/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-gold focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none">
            <option value="all">All Categories</option>
            <option value="hair">Hair</option>
            <option value="beard">Beard</option>
            <option value="package">Package</option>
          </select>
          <select className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gold/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gold/10 text-gold text-left text-xs uppercase tracking-wider">
                <th className="p-4">Service Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">Price</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-dark flex items-center justify-center text-gold border border-gold/20">
                        <Scissors size={20} />
                      </div>
                      <span className="font-medium text-white">{service.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 truncate max-w-xs">{service.description}</td>
                  <td className="p-4 font-medium text-white">{service.price}</td>
                  <td className="p-4 text-gray-400">{service.duration}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-gold hover:bg-gold/10 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        onClick={() => deleteService(service.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredServices.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No services found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};
