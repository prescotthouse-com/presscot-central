import { useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import LogoBar from '../components/LogoBar.jsx';
import siteData from '../../json/mainSiteData.json';

const Contact = () => {
  const { palette } = useDarkMode();
  const contactData = siteData.pages.contact;
  const formData = siteData.forms.contactBasic;
  const contactInfo = siteData.components.contactInfo;
  
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    insuranceProvider: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        insuranceProvider: '',
        consent: false
      });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const heroStyle = {
    padding: '4rem 2rem',
    textAlign: 'center',
    background: `linear-gradient(135deg, ${palette.background} 0%, ${palette.surface} 100%)`,
    borderBottom: `1px solid ${palette.surface}`
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '4rem',
    alignItems: 'start'
  };

  const formStyle = {
    backgroundColor: palette.surface,
    padding: '2rem',
    borderRadius: '16px',
    border: `1px solid ${palette.surface}`,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    border: `2px solid ${palette.surface}`,
    borderRadius: '8px',
    backgroundColor: palette.background,
    color: palette.text,
    fontSize: '1rem',
    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
    transition: 'all 0.3s ease',
    marginBottom: '1rem'
  };

  const buttonStyle = {
    backgroundColor: palette.primary,
    color: palette.background,
    border: 'none',
    borderRadius: '50px',
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const contactInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  };

  const contactCardStyle = {
    backgroundColor: palette.surface,
    padding: '2rem',
    borderRadius: '16px',
    border: `1px solid ${palette.surface}`,
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ backgroundColor: palette.background, minHeight: '100vh' }}
    >
      <LogoBar />
      
      {/* Hero Section */}
      <motion.section variants={itemVariants} style={heroStyle}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700',
          color: palette.primary,
          marginBottom: '1rem',
          fontFamily: '"PT Serif", serif',
          lineHeight: '1.2'
        }}>
          {contactData.hero.heading}
        </h1>
        <p style={{
          fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
          color: palette.mutedText,
          fontFamily: '"PT Serif", serif',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          {contactData.hero.subheading}
        </p>
      </motion.section>

      {/* Main Content */}
      <motion.div variants={itemVariants} style={contentStyle}>
        {/* Contact Form */}
        <motion.div variants={itemVariants} style={formStyle}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '600',
            color: palette.text,
            marginBottom: '2rem',
            fontFamily: '"PT Serif", serif',
            textAlign: 'center'
          }}>
            {contactData.sections[0].heading}
          </h2>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: 'center',
                padding: '2rem',
                color: palette.primary,
                fontSize: '1.2rem',
                fontWeight: '600'
              }}
            >
              <FontAwesomeIcon icon={faPhone} style={{ fontSize: '2rem', marginBottom: '1rem' }} />
              <p>{formData.successMessage}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: palette.text, fontWeight: '500' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = palette.primary}
                    onBlur={(e) => e.target.style.borderColor = palette.surface}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: palette.text, fontWeight: '500' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = palette.primary}
                    onBlur={(e) => e.target.style.borderColor = palette.surface}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: palette.text, fontWeight: '500' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = palette.primary}
                  onBlur={(e) => e.target.style.borderColor = palette.surface}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: palette.text, fontWeight: '500' }}>
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = palette.primary}
                  onBlur={(e) => e.target.style.borderColor = palette.surface}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: palette.text, fontWeight: '500' }}>
                  Insurance Provider
                </label>
                <input
                  type="text"
                  name="insuranceProvider"
                  value={formState.insuranceProvider}
                  onChange={handleInputChange}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = palette.primary}
                  onBlur={(e) => e.target.style.borderColor = palette.surface}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: palette.text, fontWeight: '500' }}>
                  How can we help?
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  rows="4"
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: '120px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = palette.primary}
                  onBlur={(e) => e.target.style.borderColor = palette.surface}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: palette.text, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formState.consent}
                    onChange={handleInputChange}
                    required
                    style={{ marginRight: '0.5rem' }}
                  />
                  I agree to be contacted at the phone and email provided. *
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                style={buttonStyle}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = palette.accent;
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = palette.primary;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    {formData.submitLabel}
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={itemVariants} style={contactInfoStyle}>
          <motion.div
            style={contactCardStyle}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = palette.background;
              e.target.style.borderColor = palette.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = palette.surface;
              e.target.style.borderColor = palette.surface;
            }}
          >
            <a href={contactInfo.phone.href} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <FontAwesomeIcon 
                  icon={faPhone} 
                  style={{ 
                    color: palette.primary, 
                    fontSize: '1.5rem',
                    padding: '1rem',
                    backgroundColor: palette.background,
                    borderRadius: '50%'
                  }} 
                />
                <div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: palette.text,
                    margin: '0 0 0.5rem 0',
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                  }}>
                    Call Us
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: palette.primary,
                    margin: '0',
                    fontWeight: '600'
                  }}>
                    {contactInfo.phone.label}
                  </p>
                </div>
              </div>
            </a>
          </motion.div>

          <motion.div
            style={contactCardStyle}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = palette.background;
              e.target.style.borderColor = palette.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = palette.surface;
              e.target.style.borderColor = palette.surface;
            }}
          >
            <a href={contactInfo.email.href} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  style={{ 
                    color: palette.primary, 
                    fontSize: '1.5rem',
                    padding: '1rem',
                    backgroundColor: palette.background,
                    borderRadius: '50%'
                  }} 
                />
                <div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: palette.text,
                    margin: '0 0 0.5rem 0',
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                  }}>
                    Email Us
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: palette.primary,
                    margin: '0',
                    fontWeight: '600'
                  }}>
                    {contactInfo.email.label}
                  </p>
                </div>
              </div>
            </a>
          </motion.div>

          <motion.div
            style={contactCardStyle}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = palette.background;
              e.target.style.borderColor = palette.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = palette.surface;
              e.target.style.borderColor = palette.surface;
            }}
          >
            <a href={contactInfo.address.mapHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FontAwesomeIcon 
                  icon={faMapMarkerAlt} 
                  style={{ 
                    color: palette.primary, 
                    fontSize: '1.5rem',
                    padding: '1rem',
                    backgroundColor: palette.background,
                    borderRadius: '50%'
                  }} 
                />
                <div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: palette.text,
                    margin: '0 0 0.5rem 0',
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                  }}>
                    Visit Us
                  </h3>
                  {contactInfo.address.lines.map((line, index) => (
                    <p key={index} style={{
                      fontSize: '1.1rem',
                      color: palette.mutedText,
                      margin: '0',
                      lineHeight: '1.4'
                    }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
