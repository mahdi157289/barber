# Elite Cuts Barbershop - React Migration Architecture

## 1. Project Overview
This document outlines the architecture for migrating the "Elite Cuts" static HTML website to a modern, modular React application. The goal is to enhance maintainability, performance, and user experience using advanced animations and 3D elements.

## 2. Technology Stack

### Core Framework
- **React (Vite)**: Selected for its component-based architecture and fast build times.
- **TypeScript**: Ensures type safety, reducing runtime errors and improving developer tooling.

### Styling & UI
- **Tailwind CSS**: Utility-first framework for rapid styling (carried over from the original HTML to maintain design consistency).
- **Framer Motion**: The industry standard for React animations. It will replace the custom CSS/JS scroll animations and hover effects, providing smoother, physics-based transitions.

### 3D Visualization
- **Three.js / React Three Fiber (R3F)**:
  - **Why**: The user requested "3D.js" (interpreted as Three.js) for the phone object. R3F allows us to use Three.js declaratively within the React component tree.
  - **Usage**: A 3D canvas in the Hero section displaying an interactive 3D phone model (e.g., iPhone) that rotates on scroll or mouse hover.

### State Management & Routing
- **React Router (v6)**: For client-side routing between the Landing Page, Admin Dashboard, and other views.
- **Context API**: For managing global state like "Theme" (if needed), "User Auth" (for Admin), and "Booking Modal" visibility.

## 3. Modular Directory Structure

We will adopt a **Feature-First** directory structure to ensure scalability.

```
src/
├── assets/                 # Static assets
│   ├── images/            # .png, .jpg, .svg
│   └── models/            # .glb, .gltf (3D models)
├── components/             # Shared / Generic Components
│   ├── common/            # Atomic UI elements
│   │   ├── Button.tsx     # Reusable Button (Gold/Outline variants)
│   │   ├── Card.tsx       # Generic Card wrapper
│   │   ├── Modal.tsx      # Reusable Modal wrapper
│   │   └── Input.tsx      # Styled form inputs
│   ├── layout/            # Layout components
│   │   ├── Navbar.tsx     # Responsive Navigation
│   │   ├── Footer.tsx     # Site Footer
│   │   └── Layout.tsx     # Main Page Wrapper
│   └── 3d/                # Three.js specific components
│       ├── Scene.tsx      # Main Canvas setup
│       ├── PhoneModel.tsx # The 3D Phone object
│       └── Lights.tsx     # Scene lighting
├── features/               # Feature-specific Logic & Views
│   ├── landing/           # Landing Page Sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Gallery.tsx
│   │   └── ...
│   └── admin/             # Admin Panel Features
│       ├── Dashboard.tsx
│       ├── Sidebar.tsx
│       └── ServiceManager.tsx
├── hooks/                  # Custom React Hooks
│   ├── useScroll.ts       # Scroll position logic
│   └── useWindowSize.ts   # Responsive logic
├── styles/                 # Global Styles
│   └── index.css          # Tailwind directives & global variables
└── types/                  # TypeScript Definitions
    └── index.ts           # Shared interfaces (Service, Booking, etc.)
```

## 4. Component Architecture Details

### 4.1. The Hero Section (React + R3F)
Instead of a static background image, the Hero section will contain a `<Canvas>` component.
- **Background**: A shader or CSS gradient to match the "Gold/Dark" theme.
- **Foreground**: The `<PhoneModel />` component.
  - We will use `useFrame` from R3F to animate the rotation.
  - `Float` from `@react-three/drei` will add a gentle floating effect.

### 4.2. Animations (Framer Motion)
- **Scroll Reveal**: We will create a `<Reveal>` wrapper component.
  ```tsx
  <Reveal>
    <ServiceCard />
  </Reveal>
  ```
  This component will use `useInView` to trigger a fade-in/slide-up animation when the element enters the viewport.

### 4.3. Modularity & Reusability
- **Data-Driven**: Services, Testimonials, and Gallery items will be stored in constant arrays (or fetched from an API) and mapped to components. This makes updating content easy without touching the markup.
  - Example: `services.map(service => <ServiceCard key={service.id} {...service} />)`

## 5. Migration Strategy
1.  **Setup**: Initialize Tailwind and dependencies.
2.  **Core UI**: Port basic styles (Buttons, Typography) to React components.
3.  **Layout**: Rebuild Navbar and Footer.
4.  **3D Implementation**: Set up the R3F Canvas and a placeholder Phone model.
5.  **Sections**: Port HTML sections one by one to `features/landing/`.
6.  **Admin**: Implement the Admin layout and dashboard charts.
