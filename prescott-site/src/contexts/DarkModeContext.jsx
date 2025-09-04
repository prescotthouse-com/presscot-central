import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

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
    return {
      background: isDarkMode ? "#191918" : "#FCFCFA",
      surface: isDarkMode ? "#022305" : "#F4F1EA",
      primary: isDarkMode ? "#EAC242" : "#C19721",
      accent: isDarkMode ? "#C19721" : "#EAC242",
      text: isDarkMode ? "#FCFCFA" : "#191918",
      mutedText: isDarkMode ? "#F4F1EA" : "#022305",
    };
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