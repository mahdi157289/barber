import React from 'react';
import { Mail, Reply, Trash2, CheckCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const MessagesManager = () => {
  const { messages, markMessageRead, deleteMessage } = useData();

  const handleReply = (email: string, subject: string) => {
    window.location.href = `mailto:${email}?subject=Re: ${subject}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-white">Messages</h1>
          <p className="text-gray-400 text-sm">Inbox and inquiries from customers</p>
        </div>
      </div>

      <div className="bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gold/10 rounded-xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No messages yet.
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 hover:bg-white/5 transition-colors ${!message.read ? 'bg-gold/5' : ''}`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <button 
                      onClick={() => markMessageRead(message.id)}
                      className={`mt-1 w-2 h-2 rounded-full shrink-0 transition-colors ${!message.read ? 'bg-gold hover:bg-gold/80' : 'bg-transparent border border-white/10'}`}
                      title={!message.read ? "Mark as read" : "Read"}
                    />
                    <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-gray-400 border border-white/10 shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className={`text-sm ${!message.read ? 'font-bold text-white' : 'font-medium text-gray-300'}`}>
                          {message.name}
                        </h4>
                        <span className="text-xs text-gray-500">{message.date}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-1">{message.subject || '(No Subject)'}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                      <p className="text-xs text-gold mt-1">{message.email} • {message.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleReply(message.email, message.subject || '')}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" 
                      title="Reply"
                    >
                      <Reply size={16} />
                    </button>
                    {!message.read && (
                      <button 
                        onClick={() => markMessageRead(message.id)}
                        className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-colors" 
                        title="Mark as Read"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteMessage(message.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" 
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
