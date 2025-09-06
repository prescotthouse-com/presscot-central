import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt, 
  faShieldAlt,
  faChevronRight,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faInstagram, 
  faLinkedin, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { palette } = useDarkMode();
  
  // Footer will have dark background in light mode, light background in dark mode
  const footerBg = palette.text;
  const footerText = palette.background;
  const footerMutedText = `${palette.background}80`;

  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: footerBg,
      color: footerText,
      marginTop: 'auto'
    }}>
      {/* Main Footer Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: window.innerWidth <= 768 ? '3rem 1.5rem 2rem 1.5rem' : '4rem 2rem 3rem 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768 
            ? '1fr' 
            : window.innerWidth <= 1024 
              ? 'repeat(2, 1fr)' 
              : 'repeat(4, 1fr)',
          gap: window.innerWidth <= 768 ? '2.5rem' : '3rem'
        }}>
          
          {/* Company Info Section */}
          <div style={{
            gridColumn: window.innerWidth <= 1024 ? 'span 2' : 'span 1'
          }}>
            <img 
              src="/Logos/logo-white.png" 
              alt="Prescott House Logo" 
              style={{
                height: '60px',
                width: 'auto',
                marginBottom: '1.5rem',
                filter: palette.text === '#191918' ? 'none' : 'invert(1)' // Invert in dark mode
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            
            <p style={{
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: footerMutedText,
              marginBottom: '1.5rem',
              fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
              maxWidth: '280px'
            }}>
              Prescott House provides compassionate, evidence-based treatment for addiction and mental health recovery in a supportive environment.
            </p>

            {/* Site Security */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              marginBottom: '1.5rem'
            }}>
              <FontAwesomeIcon 
                icon={faShieldAlt} 
                style={{ 
                  fontSize: '1.1rem', 
                  color: '#00D084' // Green for security
                }} 
              />
              <span style={{
                fontSize: '0.85rem',
                color: footerMutedText,
                fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
              }}>
                Site Secure & HIPAA Compliant
              </span>
            </div>

            {/* Social Media */}
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              {[faFacebook, faInstagram, faLinkedin, faTwitter].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    backgroundColor: `${footerText}15`,
                    borderRadius: '50%',
                    color: footerText,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = palette.primary;
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = `${footerText}15`;
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <FontAwesomeIcon icon={icon} style={{ fontSize: '1.1rem' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: footerText,
              marginBottom: '1.2rem',
              fontFamily: '"PT Serif", serif'
            }}>
              Quick Links
            </h3>
            
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { title: 'Home', path: '/' },
                { title: 'About Us', path: '/about' },
                { title: 'Our Programs', path: '/programs' },
                { title: 'Our Team', path: '/team' },
                { title: 'Resources', path: '/resources' },
                { title: 'Contact', path: '/contact' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.8rem' }}>
                  <Link
                    to={link.path}
                    style={{
                      color: footerMutedText,
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = footerText;
                      e.target.style.paddingLeft = '0.5rem';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = footerMutedText;
                      e.target.style.paddingLeft = '0';
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={faChevronRight} 
                      style={{ fontSize: '0.7rem', opacity: 0.6 }} 
                    />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: footerText,
              marginBottom: '1.2rem',
              fontFamily: '"PT Serif", serif'
            }}>
              Our Programs
            </h3>
            
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { title: 'Love & Intimacy', path: '/love-and-intimacy' },
                { title: 'Gambling Addiction', path: '/gambling-addiction' },
                { title: 'Substance Use Disorder', path: '/substance-use-disorder' },
                { title: 'Mental Health', path: '/mental-health' },
                { title: 'Family Support', path: '/family-support' }
              ].map((program, index) => (
                <li key={index} style={{ marginBottom: '0.8rem' }}>
                  <Link
                    to={program.path}
                    style={{
                      color: footerMutedText,
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = footerText;
                      e.target.style.paddingLeft = '0.5rem';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = footerMutedText;
                      e.target.style.paddingLeft = '0';
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={faChevronRight} 
                      style={{ fontSize: '0.7rem', opacity: 0.6 }} 
                    />
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: footerText,
              marginBottom: '1.2rem',
              fontFamily: '"PT Serif", serif'
            }}>
              Contact Info
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {/* Phone */}
              <a
                href="tel:+1234567890"
                style={{
                  color: footerMutedText,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = footerText;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = footerMutedText;
                }}
              >
                <FontAwesomeIcon icon={faPhone} style={{ fontSize: '0.9rem' }} />
                <span>(123) 456-7890</span>
              </a>

              {/* Email */}
              <a
                href="mailto:info@prescotthouse.com"
                style={{
                  color: footerMutedText,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = footerText;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = footerMutedText;
                }}
              >
                <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '0.9rem' }} />
                <span>info@prescotthouse.com</span>
              </a>

              {/* Address */}
              <div style={{
                color: footerMutedText,
                fontSize: '0.9rem',
                fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.8rem',
                lineHeight: '1.4'
              }}>
                <FontAwesomeIcon 
                  icon={faMapMarkerAlt} 
                  style={{ fontSize: '0.9rem', marginTop: '0.1rem' }} 
                />
                <span>
                  123 Recovery Lane<br />
                  Prescott, AZ 86301
                </span>
              </div>

              {/* Hours */}
              <div style={{
                color: footerMutedText,
                fontSize: '0.9rem',
                fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.8rem',
                lineHeight: '1.4'
              }}>
                <FontAwesomeIcon 
                  icon={faClock} 
                  style={{ fontSize: '0.9rem', marginTop: '0.1rem' }} 
                />
                <span>
                  24/7 Crisis Support<br />
                  Mon-Fri: 8AM-6PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: `1px solid ${footerText}20`,
        padding: window.innerWidth <= 768 ? '1.5rem 1.5rem' : '2rem 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: window.innerWidth <= 768 ? 'center' : 'center',
          gap: window.innerWidth <= 768 ? '1rem' : '0'
        }}>
          {/* Copyright */}
          <div style={{
            fontSize: '0.85rem',
            color: footerMutedText,
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
            textAlign: window.innerWidth <= 768 ? 'center' : 'left'
          }}>
            © {currentYear} Prescott House. All rights reserved.
          </div>

          {/* Legal Links */}
          <div style={{
            display: 'flex',
            gap: window.innerWidth <= 768 ? '1.5rem' : '2rem',
            fontSize: '0.85rem',
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
          }}>
            {[
              { title: 'Privacy Policy', path: '/privacy' },
              { title: 'Terms of Service', path: '/terms' },
              { title: 'Sitemap', path: '/sitemap' },
              { title: 'Careers', path: '/careers' }
            ].map((link, index) => (
              <Link
                key={index}
                to={link.path}
                style={{
                  color: footerMutedText,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = footerText;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = footerMutedText;
                }}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
