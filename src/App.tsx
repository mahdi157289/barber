import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './features/landing/Hero';
import { Services } from './features/landing/Services';
import { Gallery } from './features/landing/Gallery';
import { About } from './features/landing/About';
import { Team } from './features/landing/Team';
import { Testimonials } from './features/landing/Testimonials';
import { SocialMedia } from './features/landing/SocialMedia';
import { Contact } from './features/landing/Contact';

import { BookingModal } from './components/common/BookingModal';
import { Preloader } from './components/common/Preloader';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import AdminToggle from './components/layout/AdminToggle';
import { AdminLayout } from './features/admin/AdminLayout';
import { Dashboard } from './features/admin/Dashboard';
import { ServicesManager } from './features/admin/ServicesManager';
import { GalleryManager } from './features/admin/GalleryManager';
import { CalendarManager } from './features/admin/CalendarManager';
import { MessagesManager } from './features/admin/MessagesManager';
import { TestimonialsManager } from './features/admin/TestimonialsManager';
import { TeamManager } from './features/admin/TeamManager';
import { Settings } from './features/admin/Settings';
import { DataProvider } from './context/DataContext';
import { AnimatePresence } from 'framer-motion';

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <BookingModal />
    <ScrollToTop />
    <AdminToggle />
    <Footer />
  </>
);

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <DataProvider>
      <AnimatePresence mode='wait'>
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <Router>
          <div className="min-h-screen bg-dark text-white font-sans selection:bg-gold selection:text-dark">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <MainLayout>
                  <Hero />
                  <About />
                  <Team />
                  <Services />
                  <Gallery />
                  <Testimonials />
                  <SocialMedia />
                  <Contact />
                </MainLayout>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="services" element={<ServicesManager />} />
                <Route path="gallery" element={<GalleryManager />} />
                <Route path="testimonials" element={<TestimonialsManager />} />
                <Route path="bookings" element={<CalendarManager />} />
                <Route path="team" element={<TeamManager />} />
                <Route path="messages" element={<MessagesManager />} />
                <Route path="content" element={<Settings />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </div>
        </Router>
      )}
    </DataProvider>
  );
}

export default App;
