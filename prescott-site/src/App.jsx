import React from 'react';
import { useDarkMode } from './contexts/DarkModeContext.jsx';
import DarkModeButton from './logicalButtons/DarkModeButton.jsx';

function App() {
  const { palette } = useDarkMode();

  // Set body background color inline
  React.useEffect(() => {
    document.body.style.backgroundColor = palette.background;
    document.body.style.margin = '0';
    document.body.style.fontFamily = 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif';
  }, [palette.background]);

  return (
    <div style={{ 
      backgroundColor: palette.background, 
      color: palette.text,
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <DarkModeButton />
      </div>
      
      <h1 style={{ 
        color: palette.primary, 
        marginBottom: '1rem',
        fontSize: '3rem',
        fontWeight: '700'
      }}>
        Hello World
      </h1>
      
      <p style={{ 
        color: palette.mutedText,
        fontSize: '1.2rem',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        Dark mode is working with your custom color palette!
      </p>
    </div>
  );
}

export default App;