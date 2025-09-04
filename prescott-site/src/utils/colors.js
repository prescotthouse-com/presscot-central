// colors.js

// Exported palette object with descriptive keys instead of fixed color names
// Each value switches between light and dark mode using ternaries

let isDarkMode = false;

export const palette = {
    background: isDarkMode ? "#191918" : "#FCFCFA", // Main background color
    surface: isDarkMode ? "#022305" : "#F4F1EA",    // Surface / secondary background
    primary: isDarkMode ? "#EAC242" : "#C19721",    // Primary brand color
    accent: isDarkMode ? "#C19721" : "#EAC242",     // Accent / secondary brand color
    text: isDarkMode ? "#FCFCFA" : "#191918",       // Primary text color
    mutedText: isDarkMode ? "#F4F1EA" : "#022305",  // Muted / secondary text
  };
  