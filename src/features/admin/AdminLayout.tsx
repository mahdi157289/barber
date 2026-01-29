import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { motion } from 'framer-motion';

export const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-dark">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      
      <motion.main 
        initial={false}
        animate={{ marginLeft: isSidebarCollapsed ? 90 : 280 }}
        className="min-h-screen p-8 transition-all duration-300"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};
