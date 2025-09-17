import React from 'react';
import { getImagePath } from './imagePaths.js';

// Image preloader utility for performance optimization
// Preloads images and caches them in memory to prevent re-loading

class ImagePreloader {
  constructor() {
    this.cache = new Map();
    this.loadingPromises = new Map();
  }

  // Preload a single image and cache it
  preloadImage(src) {
    // Return cached promise if already loading/loaded
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src);
    }

    // Return resolved promise if already cached
    if (this.cache.has(src)) {
      return Promise.resolve(this.cache.get(src));
    }

    // Create new loading promise
    const loadingPromise = new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.cache.set(src, img);
        this.loadingPromises.delete(src);
        resolve(img);
      };
      
      img.onerror = (error) => {
        this.loadingPromises.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      // Start loading
      img.src = src;
    });

    this.loadingPromises.set(src, loadingPromise);
    return loadingPromise;
  }

  // Preload multiple images
  preloadImages(srcArray) {
    return Promise.all(srcArray.map(src => this.preloadImage(src)));
  }

  // Check if image is cached
  isCached(src) {
    return this.cache.has(src);
  }

  // Get cached image
  getCachedImage(src) {
    return this.cache.get(src);
  }

  // Clear cache (optional, for memory management)
  clearCache() {
    this.cache.clear();
    this.loadingPromises.clear();
  }

  // Get cache size
  getCacheSize() {
    return this.cache.size;
  }
}

// Create singleton instance
const imagePreloader = new ImagePreloader();

// Parallax images that need preloading
export const PARALLAX_IMAGES = [
  getImagePath('/Images/par/back.png'),
  getImagePath('/Images/par/mid.png'),
  getImagePath('/Images/par/front.png')
];

// Hook for preloading parallax images
export const useParallaxImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = React.useState(false);
  const [loadingError, setLoadingError] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;

    const preloadParallaxImages = async () => {
      try {
        await imagePreloader.preloadImages(PARALLAX_IMAGES);
        if (isMounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.warn('Some parallax images failed to preload:', error);
        if (isMounted) {
          setLoadingError(error);
          // Still set as loaded to prevent blocking
          setImagesLoaded(true);
        }
      }
    };

    preloadParallaxImages();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    imagesLoaded,
    loadingError,
    isImageCached: (src) => imagePreloader.isCached(src)
  };
};

export default imagePreloader;
