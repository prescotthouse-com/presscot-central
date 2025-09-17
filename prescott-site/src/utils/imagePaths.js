// Utility for handling image paths in different environments
// This ensures images load correctly both in development and production (GitHub Pages)

export const getImagePath = (imagePath) => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // In production (GitHub Pages), use the base URL
  // In development, Vite serves from root
  return import.meta.env.BASE_URL + cleanPath;
};

// Common image paths - can be imported and used throughout the app
export const IMAGES = {
  // Logos
  emblem: '/Logos/emblem.png',
  logoWhite: '/Logos/logo-white.png',
  wordMark: '/Prescott House WordMark-07.svg',
  
  // Parallax images
  parallaxBack: '/Images/par/back.png',
  parallaxMid: '/Images/par/mid.png',
  parallaxFront: '/Images/par/front.png',
  
  // Gallery images
  g1: '/Images/g1.jpg',
  g2: '/Images/g2.jpg',
  g3: '/Images/g3.jpg',
  g4: '/Images/g4.jpg',
  g5: '/Images/g5.jpg',
  g6: '/Images/g6.jpg',
  
  // Program images
  p1: '/Images/p1.jpg',
  p2: '/Images/p2.jpg',
  p3: '/Images/p3.jpg',
  p4: '/Images/p4.jpg',
  p5: '/Images/p5.jpg',
  p6: '/Images/p6.jpg',
  p7: '/Images/p7.jpg',
  p8: '/Images/p8.jpg',
  
  // Other images
  l1: '/Images/l1.jpg',
  careers1: '/Images/careers1.jpg',
  presmap: '/presmap.jpeg'
};

// Helper to get image path with proper base URL
export const getImage = (imageKey) => {
  const imagePath = IMAGES[imageKey];
  return imagePath ? getImagePath(imagePath) : '';
};
