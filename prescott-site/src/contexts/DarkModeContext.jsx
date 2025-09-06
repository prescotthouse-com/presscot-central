import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getPalette } from '../utils/colors.js';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const getCurrentPalette = () => {
    return getPalette(isDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{
      isDarkMode,
      toggleDarkMode,
      palette: getCurrentPalette()
    }}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};