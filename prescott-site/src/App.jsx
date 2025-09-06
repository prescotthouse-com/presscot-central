import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDarkMode } from './contexts/DarkModeContext.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import OurTeam from './pages/OurTeam.jsx';
import Resources from './pages/Resources.jsx';

function App() {
  const { palette } = useDarkMode();

  // Set body background color and fonts inline
  React.useEffect(() => {
    document.body.style.backgroundColor = palette.background;
    document.body.style.margin = '0';
    document.body.style.fontFamily = '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif';
  }, [palette.background]);

  return (
    <Router>
      <div style={{ 
        backgroundColor: palette.background, 
        color: palette.text,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <NavBar />
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<OurTeam />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;