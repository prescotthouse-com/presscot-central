import { useDarkMode } from '../contexts/DarkModeContext.jsx';

const LogoBar = () => {
  const { palette } = useDarkMode();

  const logoBarStyle = {
    backgroundColor: palette.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80px',
    width: '100%'
  };

  const logoStyle = {
    height: '200px',
    width: 'auto',
    maxWidth: '300px'
  };

  return (
    <div style={logoBarStyle}>
      <img 
        src="/Prescott House WordMark-07.svg" 
        alt="Prescott House" 
        style={logoStyle}
      />
    </div>
  );
};

export default LogoBar;
