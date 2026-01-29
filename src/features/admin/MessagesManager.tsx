import React from 'react';
import { Mail, Archive, Reply, Trash2 } from 'lucide-react';

const messages = [
  { id: 1, sender: "Alice Williams", email: "alice@example.com", subject: "Wedding Booking Inquiry", preview: "Hi, I'm looking to book services for a groom and 4 groomsmen on...", date: "10 mins ago", read: false },
  { id: 2, sender: "Bob Miller", email: "bob@example.com", subject: "Opening Hours", preview: "Are you open on Sundays? I couldn't find the info on your...", date: "2 hours ago", read: true },
  { id: 3, sender: "Charlie Brown", email: "charlie@example.com", subject: "Product Question", preview: "Do you sell the beard oil you used on me last time?", date: "Yesterday", read: true },
];

export const MessagesManager = () => {
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
          {messages.map((message) => (
            <div key={message.id} className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${!message.read ? 'bg-gold/5' : ''}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!message.read ? 'bg-gold' : 'bg-transparent'}`} />
                  <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-gray-400 border border-white/10 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className={`text-sm ${!message.read ? 'font-bold text-white' : 'font-medium text-gray-300'}`}>
                        {message.sender}
                      </h4>
                      <span className="text-xs text-gray-500">{message.date}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{message.subject}</p>
                    <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Reply">
                    <Reply size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Archive">
                    <Archive size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
