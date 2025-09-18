import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTouchDetection } from '../utils/touchUtils.js';

const DarkModeButton = () => {
  const { isDarkMode, toggleDarkMode, palette } = useDarkMode();
  const isTouch = useTouchDetection();

  // Add keyframe animation styles to document head
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes iconFade {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.05); }
        100% { opacity: 1; transform: scale(1); }
      }
      .dark-mode-icon {
        animation: iconFade 0.4s ease-in-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleDarkMode();
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Create touch-aware interaction handlers
  const createInteractionHandlers = () => {
    if (isTouch) {
      return {
        onTouchStart: (e) => {
          e.currentTarget.style.backgroundColor = palette.surface;
        },
        onTouchEnd: (e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        },
        onTouchCancel: (e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      };
    } else {
      return {
        onMouseEnter: (e) => {
          e.target.style.backgroundColor = palette.surface;
        },
        onMouseLeave: (e) => {
          e.target.style.backgroundColor = 'transparent';
        }
      };
    }
  };

  return (
    <button
      onClick={handleToggle}
      {...createInteractionHandlers()}
      style={{
        backgroundColor: 'transparent',
        color: palette.text,
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
        padding: '0.75rem',
        minWidth: '44px',
        minHeight: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none'
      }}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <FontAwesomeIcon 
        icon={isDarkMode ? faSun : faMoon} 
        className={isAnimating ? 'dark-mode-icon' : ''}
      />
    </button>
  );
};

export default DarkModeButton;