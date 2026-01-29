import React from 'react';

const AdminPageTitle = ({ title }: { title: string }) => (
  <h1 className="text-3xl font-serif font-bold text-white mb-6">{title}</h1>
);

export const AdminServices = () => (
  <div>
    <AdminPageTitle title="Manage Services" />
    <div className="p-8 bg-darker border border-gold/10 rounded-xl text-center text-gray-400">
      Services management interface coming soon.
    </div>
  </div>
);

export const AdminGallery = () => (
  <div>
    <AdminPageTitle title="Manage Gallery" />
    <div className="p-8 bg-darker border border-gold/10 rounded-xl text-center text-gray-400">
      Gallery management interface coming soon.
    </div>
  </div>
);

export const AdminTestimonials = () => (
  <div>
    <AdminPageTitle title="Manage Testimonials" />
    <div className="p-8 bg-darker border border-gold/10 rounded-xl text-center text-gray-400">
      Testimonials management interface coming soon.
    </div>
  </div>
);

export const AdminBookings = () => (
  <div>
    <AdminPageTitle title="Bookings" />
    <div className="p-8 bg-darker border border-gold/10 rounded-xl text-center text-gray-400">
      Bookings management interface coming soon.
    </div>
  </div>
);

export const AdminMessages = () => (
  <div>
    <AdminPageTitle title="Messages" />
    <div className="p-8 bg-darker border border-gold/10 rounded-xl text-center text-gray-400">
      Messages management interface coming soon.
    </div>
  </div>
);

export const AdminSettings = () => (
  <div>
    <AdminPageTitle title="Settings" />
    <div className="p-8 bg-darker border border-gold/10 rounded-xl text-center text-gray-400">
      Admin settings interface coming soon.
    </div>
  </div>
);
