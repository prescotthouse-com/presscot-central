// Utility functions for handling touch vs mouse interactions
// This helps prevent double-tap issues on mobile devices
import React from 'react';

let isTouchDevice = false;

// Detect if the current device supports touch
export const detectTouchDevice = () => {
  if (typeof window !== 'undefined') {
    isTouchDevice = 'ontouchstart' in window || 
                   navigator.maxTouchPoints > 0 || 
                   navigator.msMaxTouchPoints > 0;
  }
  return isTouchDevice;
};

// Initialize touch detection
detectTouchDevice();

// Hook to get touch-aware event handlers
export const useTouchAwareHandlers = (palette) => {
  const isTouch = detectTouchDevice();

  // For touch devices, we only use touch events
  // For mouse devices, we use hover events
  const createButtonHandlers = (activeStyle = {}, normalStyle = {}) => {
    if (isTouch) {
      return {
        onTouchStart: (e) => {
          Object.assign(e.currentTarget.style, activeStyle);
        },
        onTouchEnd: (e) => {
          Object.assign(e.currentTarget.style, normalStyle);
        },
        onTouchCancel: (e) => {
          Object.assign(e.currentTarget.style, normalStyle);
        }
      };
    } else {
      return {
        onMouseEnter: (e) => {
          Object.assign(e.target.style, activeStyle);
        },
        onMouseLeave: (e) => {
          Object.assign(e.target.style, normalStyle);
        }
      };
    }
  };

  const createLinkHandlers = (hoverColor, normalColor) => {
    if (isTouch) {
      return {
        onTouchStart: (e) => {
          e.currentTarget.style.color = hoverColor;
        },
        onTouchEnd: (e) => {
          e.currentTarget.style.color = normalColor;
        },
        onTouchCancel: (e) => {
          e.currentTarget.style.color = normalColor;
        }
      };
    } else {
      return {
        onMouseOver: (e) => {
          e.target.style.color = hoverColor;
        },
        onMouseOut: (e) => {
          e.target.style.color = normalColor;
        }
      };
    }
  };

  return {
    createButtonHandlers,
    createLinkHandlers,
    isTouch
  };
};

// React hook version
export const useTouchDetection = () => {
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    const handleFirstTouch = () => {
      setIsTouch(true);
      document.removeEventListener('touchstart', handleFirstTouch);
    };

    const handleFirstMouse = () => {
      setIsTouch(false);
      document.removeEventListener('mouseover', handleFirstMouse);
    };

    // Initially detect based on capabilities
    setIsTouch(detectTouchDevice());

    // Then refine based on actual usage
    document.addEventListener('touchstart', handleFirstTouch);
    document.addEventListener('mouseover', handleFirstMouse);

    return () => {
      document.removeEventListener('touchstart', handleFirstTouch);
      document.removeEventListener('mouseover', handleFirstMouse);
    };
  }, []);

  return isTouch;
};
