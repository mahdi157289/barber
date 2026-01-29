import React from 'react';
import { Star, Check, X, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const TestimonialsManager = () => {
  const { testimonials, updateTestimonialStatus, deleteTestimonial } = useData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Testimonials</h1>
          <p className="text-gray-400 text-sm">Manage client reviews and feedback</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gold/10 rounded-xl p-6 hover:border-gold/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={`${i < item.rating ? 'fill-gold text-gold' : 'text-gray-600'}`} />
                ))}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === 'Approved' ? 'bg-green-500/20 text-green-500' : 
                item.status === 'Rejected' ? 'bg-red-500/20 text-red-500' :
                'bg-yellow-500/20 text-yellow-500'
              }`}>
                {item.status}
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 italic">"{item.content}"</p>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.role} • {item.date}</p>
              </div>
              
              <div className="flex gap-2">
                {item.status === 'Pending' && (
                  <>
                    <button 
                      className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors" 
                      title="Approve"
                      onClick={() => updateTestimonialStatus(item.id, 'Approved')}
                    >
                      <Check size={18} />
                    </button>
                    <button 
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" 
                      title="Reject"
                      onClick={() => updateTestimonialStatus(item.id, 'Rejected')}
                    >
                      <X size={18} />
                    </button>
                  </>
                )}
                {item.status !== 'Pending' && (
                  <button 
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" 
                    title={item.status === 'Approved' ? "Reject" : "Approve"}
                    onClick={() => updateTestimonialStatus(item.id, item.status === 'Approved' ? 'Rejected' : 'Approved')}
                  >
                    {item.status === 'Approved' ? <X size={18} /> : <Check size={18} />}
                  </button>
                )}
                <button 
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" 
                  title="Delete"
                  onClick={() => deleteTestimonial(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
