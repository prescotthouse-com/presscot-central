import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import LogoBar from '../components/LogoBar.jsx';

const HomePage = () => {
  const { palette } = useDarkMode();

  return (
    <div style={{ 
      backgroundColor: palette.background, 
      color: palette.text,
      minHeight: '100vh'
    }}>
      <LogoBar />
      
    </div>
  );
};

export default HomePage;
