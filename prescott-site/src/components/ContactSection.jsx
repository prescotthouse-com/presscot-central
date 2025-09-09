import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';

const ContactSection = ({ 
  heading = "Ready to talk", 
  subheading = "Reach out for confidential help.",
  quote = null,
  phoneNumber = "866 425 2470",
  phoneHref = "tel:18664252470",
  email = "info@prescotthouse.com",
  showMotion = true,
  rotatingWords = ["specialist", "friend", "counselor", "guide"]
}) => {
  const { palette } = useDarkMode();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle word rotation
  useEffect(() => {
    if (rotatingWords.length > 1) {
      const timer = setInterval(() => {
        setCurrentWordIndex(prev => (prev + 1) % rotatingWords.length);
      }, 2500); // Change word every 2.5 seconds
      return () => clearInterval(timer);
    }
  }, [rotatingWords.length]);

  // Split heading to separate the last word for rotation
  const splitHeading = (headingText) => {
    const words = headingText.split(' ');
    if (words.length > 1) {
      const baseText = words.slice(0, -1).join(' ');
      return { baseText, hasRotatingWord: true };
    }
    return { baseText: headingText, hasRotatingWord: false };
  };

  const { baseText, hasRotatingWord } = splitHeading(heading);

  const sectionStyle = {
    backgroundColor: palette.surface,
    margin: '0 2rem 2rem 2rem',
    borderRadius: '20px',
    overflow: 'hidden'
  };

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2.5rem 2rem',
    display: 'grid',
    gridTemplateColumns: windowWidth <= 768 ? '1fr' : '1fr 1fr',
    gap: '2.5rem',
    alignItems: 'center'
  };

  const leftSideStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const formStyle = {
    backgroundColor: palette.background,
    padding: '1.8rem',
    borderRadius: '16px',
    boxShadow: `0 8px 20px ${palette.text}10`,
    border: `1px solid ${palette.surface}`
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem 0.8rem 0.8rem 2.5rem',
    border: `1px solid ${palette.surface}`,
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
    backgroundColor: palette.background,
    color: palette.text,
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: palette.primary,
    color: palette.background,
    border: 'none',
    borderRadius: '10px',
    padding: '0.8rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease'
  };

  const ContactContent = () => (
    <>
      {/* Left Side - Contact Info */}
      <div style={leftSideStyle}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: '700',
          color: palette.text,
          marginBottom: '0.8rem',
          fontFamily: '"PT Serif", serif',
          lineHeight: '1.2'
        }}>
          {hasRotatingWord ? (
            <>
              {baseText}{' '}
              <motion.span
                key={currentWordIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ 
                  color: '#C19721',
                  display: 'inline-block'
                }}
              >
                {rotatingWords[currentWordIndex]}
              </motion.span>
            </>
          ) : (
            heading
          )}
        </h2>
        
        {quote && (
          <p style={{
            fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
            color: palette.mutedText,
            marginBottom: '0.8rem',
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
            lineHeight: '1.5',
            fontStyle: 'italic'
          }}>
            &ldquo;{quote}&rdquo;
          </p>
        )}

        <p style={{
          fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
          color: palette.mutedText,
          marginBottom: '1.5rem',
          fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
          lineHeight: '1.5'
        }}>
          {subheading}
        </p>

        {/* Contact Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <motion.a 
            href={phoneHref}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              textDecoration: 'none',
              color: palette.text,
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: palette.primary,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FontAwesomeIcon icon={faPhone} style={{ fontSize: '1rem', color: palette.background }} />
            </div>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '0.1rem' }}>Call Us</div>
              <div style={{ opacity: 0.7, fontSize: '0.85rem' }}>{phoneNumber}</div>
            </div>
          </motion.a>

          <motion.a 
            href={`mailto:${email}`}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              textDecoration: 'none',
              color: palette.text,
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: palette.primary,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '1rem', color: palette.background }} />
            </div>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '0.1rem' }}>Email Us</div>
              <div style={{ opacity: 0.7, fontSize: '0.85rem' }}>{email}</div>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div>
        <form style={formStyle}>
          <h3 style={{
            fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
            fontWeight: '600',
            color: palette.text,
            marginBottom: '1.2rem',
            fontFamily: '"PT Serif", serif',
            textAlign: 'center'
          }}>
            Send us a message
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Name Field */}
            <div style={{ position: 'relative' }}>
              <FontAwesomeIcon 
                icon={faUser} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: palette.mutedText,
                  fontSize: '0.9rem'
                }}
              />
              <input
                type="text"
                placeholder="Full Name"
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = palette.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${palette.primary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = palette.surface;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Email Field */}
            <div style={{ position: 'relative' }}>
              <FontAwesomeIcon 
                icon={faEnvelope} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: palette.mutedText,
                  fontSize: '0.9rem'
                }}
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = palette.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${palette.primary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = palette.surface;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Phone Field */}
            <div style={{ position: 'relative' }}>
              <FontAwesomeIcon 
                icon={faPhone} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: palette.mutedText,
                  fontSize: '0.9rem'
                }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = palette.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${palette.primary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = palette.surface;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Message Field */}
            <textarea
              placeholder="Tell us how we can help..."
              rows="3"
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                border: `1px solid ${palette.surface}`,
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                backgroundColor: palette.background,
                color: palette.text,
                outline: 'none',
                transition: 'all 0.3s ease',
                resize: 'vertical',
                minHeight: '80px',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = palette.primary;
                e.target.style.boxShadow = `0 0 0 3px ${palette.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = palette.surface;
                e.target.style.boxShadow = 'none';
              }}
            />

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = palette.accent;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = palette.primary;
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              Send Message
            </motion.button>
          </div>
        </form>
      </div>
    </>
  );

  if (showMotion) {
    return (
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        style={sectionStyle}
      >
        <div style={containerStyle}>
          <ContactContent />
        </div>
      </motion.section>
    );
  }

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <ContactContent />
      </div>
    </section>
  );
};

ContactSection.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  quote: PropTypes.string,
  phoneNumber: PropTypes.string,
  phoneHref: PropTypes.string,
  email: PropTypes.string,
  showMotion: PropTypes.bool,
  rotatingWords: PropTypes.arrayOf(PropTypes.string)
};

export default ContactSection;
