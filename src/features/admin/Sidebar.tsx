import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Scissors, 
  Image, 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  FileText,
  Star
} from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isCollapsed, toggleSidebar }: SidebarProps) => {
  const links = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Bookings', path: '/admin/bookings', icon: Calendar, badge: 5 },
    { name: 'Services', path: '/admin/services', icon: Scissors },
    { name: 'Team', path: '/admin/team', icon: Users },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare, badge: 3 },
    { name: 'Site Content', path: '/admin/content', icon: FileText },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 90 : 280 }}
      className="fixed left-0 top-0 h-screen bg-linear-to-b from-darker to-dark border-r border-gold/20 z-40 flex flex-col"
    >
      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute top-6 -right-3 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-dark shadow-lg hover:scale-110 transition-transform z-50"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo */}
      <div className={clsx("h-20 flex items-center px-6 transition-all", isCollapsed ? "justify-center" : "justify-start gap-3")}>
        <div className={clsx("w-8 h-16 rounded barber-pole shrink-0", isCollapsed && "scale-75")} />
        
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <h1 className="font-serif font-bold text-xl text-white">
                ELITE <span className="text-gold">ADMIN</span>
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4 flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/admin'}
            className={({ isActive }) => clsx(
              "flex items-center h-12 rounded-lg transition-all duration-300 group relative",
              isActive 
                ? "bg-gold/10 text-gold" 
                : "text-gray-400 hover:bg-white/5 hover:text-white",
              isCollapsed ? "justify-center px-0" : "px-4 gap-4"
            )}
          >
            {({ isActive }) => (
              <>
                <link.icon size={22} className="shrink-0" />
                
                {!isCollapsed && (
                  <span className="font-medium whitespace-nowrap overflow-hidden flex-1">
                    {link.name}
                  </span>
                )}

                {/* Badge */}
                {!isCollapsed && link.badge && (
                  <span className={clsx(
                    "px-2 py-0.5 rounded-full text-xs font-bold",
                    link.name === 'Messages' ? "bg-red-500 text-white" : "bg-gold text-dark"
                  )}>
                    {link.badge}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-1 bg-dark border border-gold/20 rounded text-sm text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {link.name}
                  </div>
                )}
                
                {/* Active Indicator */}
                {isActive && (
                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gold rounded-r-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t border-gold/10">
        <div className={clsx("flex items-center gap-3 transition-all", isCollapsed ? "justify-center" : "")}>
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-dark font-bold shrink-0">
            AD
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <p className="font-semibold text-sm text-white whitespace-nowrap">Admin User</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">admin@elitecuts.com</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!isCollapsed && (
            <button className="ml-auto text-gray-500 hover:text-red-500 transition-colors">
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
