import React from 'react';
import { Users, Calendar, DollarSign, TrendingUp, Scissors, Search, Bell, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ title, value, change, icon: Icon, color }: StatCardProps) => (
  <div className="bg-darker border border-gold/10 rounded-xl p-6 hover:border-gold/30 transition-colors group">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${color}-500/20 text-${color}-500 group-hover:bg-${color}-500/30 transition-colors`}>
        <Icon size={24} />
      </div>
      <span className="text-green-500 text-sm flex items-center gap-1 font-medium bg-green-500/10 px-2 py-1 rounded-full">
        <TrendingUp size={14} />
        {change}
      </span>
    </div>
    <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
    <p className="text-gray-500 text-sm">{title}</p>
  </div>
);

export const Dashboard = () => {
  const { bookings, testimonials } = useData();

  // Calculate Stats
  const totalBookings = bookings.length;

  const totalRevenue = bookings
    .filter(b => b.status === 'Confirmed' || b.status === 'In Progress')
    .reduce((acc, curr) => {
      const price = parseFloat(curr.price.replace(' TND', '').replace('$', ''));
      return acc + (isNaN(price) ? 0 : price);
    }, 0);

  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length).toFixed(1)
    : "0.0";

  // Mock "New Clients" for now as we don't track user history yet
  const newClients = Math.floor(totalBookings * 0.4);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="bg-dark border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-gold/50 outline-none w-64 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          </div>

          {/* Notifications */}
          <button className="relative w-10 h-10 bg-darker rounded-full flex items-center justify-center border border-white/10 hover:border-gold/50 transition-colors">
            <Bell size={20} className="text-gray-400" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <Link to="/" className="px-4 py-2 bg-gold text-dark font-bold rounded-lg hover:bg-white transition-colors text-sm">
            View Site
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value={totalBookings.toString()}
          change="+12%"
          icon={Calendar}
          color="yellow"
        />
        <StatCard
          title="Total Revenue"
          value={`${totalRevenue.toLocaleString()} TND`}
          change="+8%"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="New Clients"
          value={newClients.toString()}
          change="+24%"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Average Rating"
          value={averageRating}
          change="+0.2"
          icon={Star}
          color="yellow"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-darker border border-gold/10 rounded-xl p-6 h-96">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Revenue Overview</h3>
            <select className="bg-dark border border-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-gold/50">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          <div className="flex items-center justify-center h-64 text-gray-500 border border-dashed border-gray-700 rounded bg-dark/30">
            Chart Placeholder
          </div>
        </div>

        {/* Services Chart */}
        <div className="bg-darker border border-gold/10 rounded-xl p-6 h-96">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Bookings by Service</h3>
            <select className="bg-dark border border-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-gold/50">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex items-center justify-center h-64 text-gray-500 border border-dashed border-gray-700 rounded bg-dark/30">
            Chart Placeholder
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-darker border border-gold/10 rounded-xl p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Recent Bookings</h3>
          <Link to="/admin/bookings" className="text-gold text-sm font-bold hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gold bg-gold/10">
                <th className="p-4 rounded-tl-lg">Client</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {bookings.slice(0, 5).map((booking) => (
                <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${booking.color} flex items-center justify-center text-xs font-bold text-white`}>
                        {booking.initials}
                      </div>
                      <div>
                        <p className="font-medium text-white">{booking.name}</p>
                        <p className="text-xs text-gray-500">{booking.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{booking.service}</td>
                  <td className="p-4 text-gray-300">{booking.time}</td>
                  <td className="p-4 font-bold text-gold">{booking.price}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-500' :
                        booking.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-blue-500/20 text-blue-500'
                      }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-400 hover:text-white"><Search size={16} /></button>
                      <button className="text-gray-400 hover:text-gold"><Scissors size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
