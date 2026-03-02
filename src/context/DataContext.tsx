import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Types
export interface Service {
  id: number;
  title: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  inStock: boolean;
}

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  date: string;
  category?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  date: string;
}

export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'In Progress';
  price: string;
  initials: string;
  color: string;
}

export interface BlockedTime {
  id: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM AM/PM
  reason?: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Worker {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  instagram?: string;
}

export interface MediaPanel {
  id: number;
  image1: string;
  image2: string;
  label?: string;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  instagram: string;
  facebook: string;
  tiktok?: string;
  twitter?: string;
}

interface DataContextType {
  services: Service[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  bookings: Booking[];
  blockedTimes: BlockedTime[];
  messages: Message[];
  workers: Worker[];
  products: Product[];
  mediaPanels: MediaPanel[];
  settings: SiteSettings;

  // Service Actions
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: number, service: Partial<Service>) => void;
  deleteService: (id: number) => void;

  // Gallery Actions
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: number) => void;

  // Testimonial Actions
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'status' | 'date'>) => void;
  updateTestimonialStatus: (id: number, status: Testimonial['status']) => void;
  deleteTestimonial: (id: number) => void;

  // Booking Actions
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'initials' | 'color'>) => boolean;
  updateBookingStatus: (id: number, status: Booking['status']) => void;
  toggleBlockTime: (date: string, time: string) => void;
  isTimeSlotAvailable: (date: string, time: string) => boolean;

  // Message Actions
  addMessage: (message: Omit<Message, 'id' | 'date' | 'read'>) => void;
  markMessageRead: (id: number) => void;
  deleteMessage: (id: number) => void;

  // Worker Actions
  addWorker: (worker: Omit<Worker, 'id'>) => void;
  updateWorker: (id: number, worker: Partial<Worker>) => void;
  deleteWorker: (id: number) => void;

  // Product Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;

  // Media Actions
  updateMediaPanel: (id: number, panel: Partial<MediaPanel>) => void;

  // Settings Actions
  updateSettings: (settings: Partial<SiteSettings>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial Data
const initialProducts: Product[] = [
  { id: 1, name: "Premium Beard Oil", price: "24.99 TND", description: "Nourishing beard oil with a blend of natural oils and a cedarwood scent.", image: "https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3", inStock: true },
  { id: 2, name: "Matte Styling Pomade", price: "19.50 TND", description: "Firm hold with a natural matte finish. Perfect for textured styles.", image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3", inStock: true },
  { id: 3, name: "Safety Razor Kit", price: "45.00 TND", description: "Classic double-edge safety razor, including 10 replacement blades.", image: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?ixlib=rb-4.0.3", inStock: false },
  { id: 4, name: "Aftershave Balm", price: "22.00 TND", description: "Soothing balm with aloe vera to calm skin after shaving.", image: "https://images.unsplash.com/photo-1616401784845-180882ba1c43?ixlib=rb-4.0.3", inStock: true }
];

const initialServices: Service[] = [
  {
    id: 1,
    title: "The Executive Cut",
    price: "45 TND",
    duration: "45 min",
    description: "Precision haircut with hot towel finish and styling consultation.",
    features: ["Consultation", "Precision Cut", "Hot Towel", "Premium Styling"]
  },
  {
    id: 2,
    title: "Royal Shave",
    price: "35 TND",
    duration: "30 min",
    description: "Traditional straight razor shave with pre-shave oil and hot towels.",
    features: ["Hot Towel Prep", "Straight Razor", "Post-Shave Balm", "Face Massage"],
    popular: true
  },
  {
    id: 3,
    title: "The Complete Package",
    price: "75 TND",
    duration: "75 min",
    description: "Our signature haircut combined with a royal shave and facial treatment.",
    features: ["Haircut & Style", "Royal Shave", "Mini Facial", "Beverage Service"]
  },
  {
    id: 4,
    title: "Beard Sculpting",
    price: "25 TND",
    duration: "30 min",
    description: "Expert beard trimming and shaping with line-up.",
    features: ["Beard Trim", "Line Up", "Beard Oil", "Hot Towel"]
  }
];

const initialGallery: GalleryItem[] = [
  { id: 1, url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3", title: "Master Cut", date: "2023-10-15" },
  { id: 2, url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3", title: "Beard Trim", date: "2023-10-14" },
  { id: 3, url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3", title: "Fade", date: "2023-10-12" },
  { id: 4, url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3", title: "Styling", date: "2023-10-10" },
  { id: 5, url: "https://images.unsplash.com/photo-1503951914875-befbb7470d03?ixlib=rb-4.0.3", title: "Shop Interior", date: "2023-10-05" },
  { id: 6, url: "https://images.unsplash.com/photo-1634480481970-1b7771746f3c?ixlib=rb-4.0.3", title: "Tools", date: "2023-10-01" },
];

const initialTestimonials: Testimonial[] = [
  { id: 1, name: "Michael Roberts", role: "Regular Client", content: "The best barbershop in the city, hands down. The attention to detail is unmatched.", rating: 5, status: "Approved", date: "2023-10-24" },
  { id: 2, name: "James Anderson", role: "Business Executive", content: "Elite Cuts is more than a barbershop; it's a gentleman's club. Impeccable service.", rating: 5, status: "Approved", date: "2023-10-23" },
  { id: 3, name: "David Chen", role: "Creative Director", content: "I've been coming here for 3 years. They understand exactly what I want.", rating: 5, status: "Pending", date: "2023-10-22" },
  { id: 4, name: "Sarah Wilson", role: "Client", content: "Great atmosphere but the wait time was a bit long.", rating: 4, status: "Pending", date: "2023-10-21" },
];

const initialBookings: Booking[] = [
  { id: 1, name: "John Doe", email: "john@email.com", service: "Classic Haircut", time: "2:00 PM", price: "35 TND", status: "Confirmed", initials: "JD", color: "bg-gold", date: new Date().toLocaleDateString('en-CA'), phone: "555-0101" },
  { id: 2, name: "Mike Smith", email: "mike@email.com", service: "VIP Package", time: "4:30 PM", price: "85 TND", status: "Pending", initials: "MS", color: "bg-blue-500", date: new Date().toLocaleDateString('en-CA'), phone: "555-0102" },
  { id: 3, name: "Robert Johnson", email: "robert@email.com", service: "Beard Grooming", time: "10:00 AM", price: "25 TND", status: "Confirmed", initials: "RJ", color: "bg-green-500", date: new Date(Date.now() + 86400000).toLocaleDateString('en-CA'), phone: "555-0103" },
  { id: 4, name: "Alex Wilson", email: "alex@email.com", service: "Hair Design", time: "2:00 PM", price: "50 TND", status: "In Progress", initials: "AW", color: "bg-purple-500", date: new Date(Date.now() + 86400000).toLocaleDateString('en-CA'), phone: "555-0104" }
];

const initialWorkers: Worker[] = [
  { id: 1, name: "Haykel Barber", role: "Master Barber & Founder", image: "https://images.unsplash.com/photo-1583900985315-953be81153bc?ixlib=rb-4.0.3", bio: "With over 15 years of experience, Haykel specializes in classic cuts and modern styling.", instagram: "haykelbarber" },
  { id: 2, name: "James Miller", role: "Senior Stylist", image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3", bio: "Expert in beard grooming and hot towel shaves. James ensures every client leaves looking sharp.", instagram: "jamescuts" },
  { id: 3, name: "Sarah Jenkins", role: "Color Specialist", image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3", bio: "Bringing creativity to every cut, Sarah is our go-to for hair coloring and designs.", instagram: "sarahstyles" }
];

const initialMediaPanels: MediaPanel[] = [
  {
    id: 1,
    image1: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3',
    image2: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3',
    label: 'Before & After'
  },
  {
    id: 2,
    image1: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3',
    image2: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3',
    label: 'Our Work'
  }
];

const initialSettings: SiteSettings = {
  siteTitle: "Elite Cuts Barbershop",
  tagline: "Premium Grooming Experience",
  email: "info@elitecuts.com",
  phone: "+1 (555) 123-4567",
  address: "123 Barber Street, Luxury District, New York, NY 10001",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  tiktok: "https://tiktok.com",
  twitter: "https://twitter.com"
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>(() => {
    const saved = localStorage.getItem('blockedTimes');
    return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [workers, setWorkers] = useState<Worker[]>(() => {
    const saved = localStorage.getItem('workers');
    return saved ? JSON.parse(saved) : initialWorkers;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [mediaPanels, setMediaPanels] = useState<MediaPanel[]>(() => {
    const saved = localStorage.getItem('mediaPanels');
    return saved ? JSON.parse(saved) : initialMediaPanels;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  // Persistence Effects
  useEffect(() => localStorage.setItem('services', JSON.stringify(services)), [services]);
  useEffect(() => localStorage.setItem('gallery', JSON.stringify(gallery)), [gallery]);
  useEffect(() => localStorage.setItem('testimonials', JSON.stringify(testimonials)), [testimonials]);
  useEffect(() => localStorage.setItem('bookings', JSON.stringify(bookings)), [bookings]);
  useEffect(() => localStorage.setItem('blockedTimes', JSON.stringify(blockedTimes)), [blockedTimes]);
  useEffect(() => localStorage.setItem('messages', JSON.stringify(messages)), [messages]);
  useEffect(() => localStorage.setItem('workers', JSON.stringify(workers)), [workers]);
  useEffect(() => localStorage.setItem('products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('mediaPanels', JSON.stringify(mediaPanels)), [mediaPanels]);
  useEffect(() => localStorage.setItem('settings', JSON.stringify(settings)), [settings]);

  // Sync with other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bookings' && e.newValue) setBookings(JSON.parse(e.newValue));
      if (e.key === 'blockedTimes' && e.newValue) setBlockedTimes(JSON.parse(e.newValue));
      if (e.key === 'workers' && e.newValue) setWorkers(JSON.parse(e.newValue));
      if (e.key === 'products' && e.newValue) setProducts(JSON.parse(e.newValue));
      if (e.key === 'mediaPanels' && e.newValue) setMediaPanels(JSON.parse(e.newValue));
      if (e.key === 'settings' && e.newValue) setSettings(JSON.parse(e.newValue));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Actions
  const addService = (service: Omit<Service, 'id'>) => {
    const newService = { ...service, id: Date.now() };
    setServices([...services, newService]);
  };

  const updateService = (id: number, updatedService: Partial<Service>) => {
    setServices(services.map(s => s.id === id ? { ...s, ...updatedService } : s));
  };

  const deleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem = { ...item, id: Date.now() };
    setGallery([newItem, ...gallery]);
  };

  const deleteGalleryItem = (id: number) => {
    setGallery(gallery.filter(item => item.id !== id));
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id' | 'status' | 'date'>) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: Date.now(),
      status: 'Pending',
      date: new Date().toLocaleDateString('en-CA')
    };
    setTestimonials([newTestimonial, ...testimonials]);
  };

  const updateTestimonialStatus = (id: number, status: Testimonial['status']) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, status } : t));
  };

  const deleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'status' | 'initials' | 'color'>) => {
    // Check for availability one last time before booking
    if (!isTimeSlotAvailable(booking.date, booking.time)) {
      return false;
    }

    const initials = booking.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const colors = ['bg-gold', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const newBooking: Booking = {
      ...booking,
      id: Date.now(),
      status: 'Pending',
      initials,
      color
    };
    setBookings([newBooking, ...bookings]);
    return true;
  };

  const updateBookingStatus = (id: number, status: Booking['status']) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  const toggleBlockTime = (date: string, time: string) => {
    const exists = blockedTimes.find(b => b.date === date && b.time === time);
    if (exists) {
      setBlockedTimes(blockedTimes.filter(b => b.id !== exists.id));
    } else {
      setBlockedTimes([...blockedTimes, { id: Date.now(), date, time, reason: 'Manual Block' }]);
    }
  };

  const isTimeSlotAvailable = (date: string, time: string) => {
    const isBlocked = blockedTimes.some(b => b.date === date && b.time === time);
    const isBooked = bookings.some(b => b.date === date && b.time === time && b.status !== 'Cancelled');
    return !isBlocked && !isBooked;
  };

  const addMessage = (message: Omit<Message, 'id' | 'date' | 'read'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-CA'),
      read: false
    };
    setMessages([newMessage, ...messages]);
  };

  const markMessageRead = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const addWorker = (worker: Omit<Worker, 'id'>) => {
    const newWorker = { ...worker, id: Date.now() };
    setWorkers([...workers, newWorker]);
  };

  const updateWorker = (id: number, updatedWorker: Partial<Worker>) => {
    setWorkers(workers.map(w => w.id === id ? { ...w, ...updatedWorker } : w));
  };

  const deleteWorker = (id: number) => {
    setWorkers(workers.filter(w => w.id !== id));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateMediaPanel = (id: number, updatedPanel: Partial<MediaPanel>) => {
    setMediaPanels(mediaPanels.map(p => p.id === id ? { ...p, ...updatedPanel } : p));
  };

  const updateSettings = (updatedSettings: Partial<SiteSettings>) => {
    setSettings({ ...settings, ...updatedSettings });
  };

  return (
    <DataContext.Provider value={{
      services,
      gallery,
      testimonials,
      bookings,
      blockedTimes,
      messages,
      workers,
      products,
      mediaPanels,
      settings,
      addService,
      updateService,
      deleteService,
      addGalleryItem,
      deleteGalleryItem,
      addTestimonial,
      updateTestimonialStatus,
      deleteTestimonial,
      addBooking,
      updateBookingStatus,
      toggleBlockTime,
      isTimeSlotAvailable,
      addMessage,
      markMessageRead,
      deleteMessage,
      addWorker,
      updateWorker,
      deleteWorker,
      addProduct,
      updateProduct,
      deleteProduct,
      updateMediaPanel,
      updateSettings
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
