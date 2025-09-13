import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import LogoBar from '../components/LogoBar.jsx';
import ContactSection from '../components/ContactSection.jsx';

const Contact = () => {
  const { palette } = useDarkMode();

  return (
    <div style={{ 
      backgroundColor: palette.background, 
      minHeight: '100vh'
    }}>
      <LogoBar />
      
      <ContactSection 
        heading="Get in touch"
        subheading="Ready to take the first step? Our compassionate team is here to help you or your loved one begin the journey to lasting recovery."
        phoneNumber="866 425 2470"
        phoneHref="tel:18664252470"
        email="info@prescotthouse.com"
        showMotion={true}
      />
    </div>
  );
};

export default Contact;
