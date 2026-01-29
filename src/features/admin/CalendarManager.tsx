import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ChevronLeft, ChevronRight, Check, X, Lock, Unlock, User } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const CalendarManager = () => {
  const { bookings, blockedTimes, toggleBlockTime, updateBookingStatus } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);

  // Generate time slots (9 AM to 7 PM)
  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 9;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${ampm}`;
  });

  // Generate week days
  const getDaysInWeek = (date: Date) => {
    const days = [];
    const start = new Date(date);
    start.setHours(0, 0, 0, 0); // Normalize to midnight
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const weekDays = getDaysInWeek(currentDate);

  const formatDate = (date: Date) => date.toLocaleDateString('en-CA');

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const getCellData = (dateStr: string, time: string) => {
    const booking = bookings.find(b => b.date === dateStr && b.time === time && b.status !== 'Cancelled');
    const blocked = blockedTimes.find(b => b.date === dateStr && b.time === time);
    return { booking, blocked };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-white">Booking Calendar</h2>
        <div className="flex items-center gap-4 bg-darker p-2 rounded-lg border border-white/10">
          <button onClick={handlePrevWeek} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </button>
          <span className="font-medium min-w-[200px] text-center">
            {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <button onClick={handleNextWeek} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="bg-darker border border-white/10 rounded-xl overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-white/10">
            <div className="p-4 border-r border-white/10 text-center text-gray-400 font-medium">Time</div>
            {weekDays.map(day => (
              <div key={day.toISOString()} className={clsx(
                "p-4 text-center border-r border-white/10 last:border-r-0",
                day.toDateString() === new Date().toDateString() ? "bg-gold/10 text-gold" : "text-gray-300"
              )}>
                <div className="text-xs uppercase opacity-70">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="font-bold text-lg">{day.getDate()}</div>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="divide-y divide-white/10">
            {timeSlots.map(time => (
              <div key={time} className="grid grid-cols-8">
                <div className="p-3 border-r border-white/10 text-xs text-gray-500 flex items-center justify-center bg-black/20">
                  {time}
                </div>
                {weekDays.map(day => {
                  const dateStr = formatDate(day);
                  const { booking, blocked } = getCellData(dateStr, time);
                  
                  return (
                    <div 
                      key={`${dateStr}-${time}`} 
                      className={clsx(
                        "relative border-r border-white/10 last:border-r-0 min-h-[80px] transition-all group",
                        !booking && !blocked && "hover:bg-white/5 cursor-pointer",
                        blocked && "bg-red-900/10 cursor-pointer hover:bg-red-900/20"
                      )}
                      onClick={() => {
                        if (booking) {
                          setSelectedBooking(selectedBooking === booking.id ? null : booking.id);
                        } else {
                          toggleBlockTime(dateStr, time);
                        }
                      }}
                    >
                      {/* Blocked State */}
                      {blocked && !booking && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500/50 gap-1">
                          <Lock size={16} />
                          <span className="text-[10px] uppercase font-bold tracking-wider">Blocked</span>
                        </div>
                      )}

                      {/* Booking State */}
                      {booking && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={clsx(
                            "absolute inset-1 rounded-md p-2 text-xs flex flex-col justify-between overflow-hidden shadow-lg border-l-2",
                            booking.status === 'Confirmed' ? "bg-green-500/20 border-green-500 text-green-100" :
                            booking.status === 'Pending' ? "bg-yellow-500/20 border-yellow-500 text-yellow-100" :
                            "bg-blue-500/20 border-blue-500 text-blue-100"
                          )}
                        >
                          <div className="font-bold truncate">{booking.name}</div>
                          <div className="opacity-80 truncate">{booking.service}</div>
                          
                          {/* Status Indicator */}
                          <div className="flex items-center gap-1 mt-1">
                            <span className={clsx(
                              "w-1.5 h-1.5 rounded-full",
                              booking.status === 'Confirmed' ? "bg-green-400" :
                              booking.status === 'Pending' ? "bg-yellow-400" : "bg-blue-400"
                            )} />
                            <span className="text-[10px] uppercase">{booking.status}</span>
                          </div>

                          {/* Quick Actions Overlay (visible on click/hover) */}
                          {selectedBooking === booking.id && (
                            <motion.div 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-black/90 flex items-center justify-center gap-2 z-10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button 
                                onClick={() => {
                                  updateBookingStatus(booking.id, 'Confirmed');
                                  setSelectedBooking(null);
                                }}
                                className="p-1.5 bg-green-500 rounded-full hover:bg-green-400 text-white"
                                title="Confirm"
                              >
                                <Check size={14} />
                              </button>
                              <button 
                                onClick={() => {
                                  updateBookingStatus(booking.id, 'Cancelled');
                                  setSelectedBooking(null);
                                }}
                                className="p-1.5 bg-red-500 rounded-full hover:bg-red-400 text-white"
                                title="Reject"
                              >
                                <X size={14} />
                              </button>
                              <button 
                                onClick={() => setSelectedBooking(null)}
                                className="text-gray-400 hover:text-white text-[10px]"
                              >
                                Close
                              </button>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 text-sm text-gray-400 bg-darker p-4 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500/20 border-l-2 border-green-500"></div>
          <span>Confirmed Booking</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500/20 border-l-2 border-yellow-500"></div>
          <span>Pending Request</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-900/10 border border-white/5 flex items-center justify-center">
            <Lock size={10} className="text-red-500/50" />
          </div>
          <span>Blocked Slot</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-gold">Click empty slot to block/unblock. Click booking to manage.</span>
        </div>
      </div>
    </div>
  );
};
