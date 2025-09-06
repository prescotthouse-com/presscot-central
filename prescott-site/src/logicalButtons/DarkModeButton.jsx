import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const DarkModeButton = () => {
  const { isDarkMode, toggleDarkMode, palette } = useDarkMode();

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

  const handleToggle = () => {
    setIsAnimating(true);
    toggleDarkMode();
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        backgroundColor: 'transparent',
        color: palette.text,
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <FontAwesomeIcon 
        icon={isDarkMode ? faSun : faMoon} 
        className={isAnimating ? 'dark-mode-icon' : ''}
      />
    </button>
  );
};

export default DarkModeButton;