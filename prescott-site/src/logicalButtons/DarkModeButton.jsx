import { useDarkMode } from '../contexts/DarkModeContext.jsx';

const DarkModeButton = () => {
  const { isDarkMode, toggleDarkMode, palette } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        backgroundColor: palette.surface,
        color: palette.text,
        border: `2px solid ${palette.primary}`,
        borderRadius: '8px',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = palette.primary;
        e.target.style.color = palette.background;
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = palette.surface;
        e.target.style.color = palette.text;
      }}
    >
      {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default DarkModeButton;