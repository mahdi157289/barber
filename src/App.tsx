import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './features/landing/Hero';
import { Products } from './features/landing/Products';
import { Media } from './features/landing/Media';
import { Services } from './features/landing/Services';
import { Gallery } from './features/landing/Gallery';
import { About } from './features/landing/About';
import { Team } from './features/landing/Team';
import { Testimonials } from './features/landing/Testimonials';
import { SocialMedia } from './features/landing/SocialMedia';
import { Contact } from './features/landing/Contact';

import { BookingModal } from './components/common/BookingModal';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { LanguageSwitcher } from './components/common/LanguageSwitcher';
import AdminToggle from './components/layout/AdminToggle';
import { AdminLayout } from './features/admin/AdminLayout';
import { Dashboard } from './features/admin/Dashboard';
import { ServicesManager } from './features/admin/ServicesManager';
import { ProductsManager } from './features/admin/ProductsManager';
import { GalleryManager } from './features/admin/GalleryManager';
import { CalendarManager } from './features/admin/CalendarManager';
import { MessagesManager } from './features/admin/MessagesManager';
import { TestimonialsManager } from './features/admin/TestimonialsManager';
import { TeamManager } from './features/admin/TeamManager';
import { MediaManager } from './features/admin/MediaManager';
import { Settings } from './features/admin/Settings';
import { DataProvider } from './context/DataContext';

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <BookingModal />
    <ScrollToTop />
    <AdminToggle />
    <LanguageSwitcher />
    <Footer />
  </>
);

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-gold selection:text-dark">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <MainLayout>
                <Hero />
                <Products />
                <Media />
                <Services />
                <Gallery />
                <SocialMedia />
                <About />
                <Team />
                <Testimonials />
                <Contact />
              </MainLayout>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="products" element={<ProductsManager />} />
              <Route path="media" element={<MediaManager />} />
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
    </DataProvider>
  );
}

export default App;
