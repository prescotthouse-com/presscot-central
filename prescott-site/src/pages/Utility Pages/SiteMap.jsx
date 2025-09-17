import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../contexts/DarkModeContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faInfoCircle, 
  faPhone, 
  faUsers, 
  faBookOpen,
  faHeart,
  faDice,
  faPrescriptionBottle,
  faChevronRight,
  faMapMarkedAlt,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import siteData from '../../../json/mainSiteData.json';

const SiteMap = () => {
  const { palette } = useDarkMode();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Site structure data
  const siteStructure = [
    {
      title: 'Main Pages',
      icon: faGlobe,
      pages: [
        { title: 'Home', path: '/', icon: faHome, description: 'Welcome to Prescott House - Premier behavioral health center' },
        { title: 'About Us', path: '/about', icon: faInfoCircle, description: 'Learn about our approach and what makes us different' },
        { title: 'Contact', path: '/contact', icon: faPhone, description: 'Get in touch with our team for help and support' },
        { title: 'Our Team', path: '/team', icon: faUsers, description: 'Meet our experienced and compassionate staff' },
        { title: 'Resources', path: '/resources', icon: faBookOpen, description: 'Educational materials and support resources' }
      ]
    },
    {
      title: 'Treatment Programs',
      icon: faHeart,
      pages: [
        { 
          title: 'Love and Intimacy', 
          path: '/love-and-intimacy', 
          icon: faHeart, 
          description: 'Specialized treatment for love addiction, intimacy disorders, and compulsive sexual behavior' 
        },
        { 
          title: 'Gambling Addiction', 
          path: '/gambling-addiction', 
          icon: faDice, 
          description: 'Comprehensive treatment for gambling addiction including sports betting, slots, and online gaming' 
        },
        { 
          title: 'Substance Use Disorder', 
          path: '/substance-use-disorder', 
          icon: faPrescriptionBottle, 
          description: 'Drug and alcohol treatment with clinical excellence and trauma-informed care' 
        }
      ]
    }
  ];

  const utilityPages = [
    { title: 'Privacy Policy', path: '/privacy', description: 'Our commitment to protecting your personal information' },
    { title: 'Terms of Service', path: '/terms', description: 'Terms and conditions for using our website and services' },
    { title: 'Sitemap', path: '/sitemap', description: 'Complete overview of all pages on our website' }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ 
        backgroundColor: palette.background, 
        color: palette.text,
        minHeight: '100vh'
      }}
    >
      {/* Hero Section */}
      <motion.section 
        variants={itemVariants}
        style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          background: `linear-gradient(135deg, ${palette.background} 0%, ${palette.surface} 100%)`,
          borderBottom: `1px solid ${palette.surface}`
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FontAwesomeIcon 
            icon={faMapMarkedAlt} 
            style={{ 
              fontSize: '4rem', 
              color: palette.primary, 
              marginBottom: '2rem' 
            }} 
          />
        </motion.div>
        
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700',
          color: palette.text,
          marginBottom: '1rem',
          fontFamily: '"PT Serif", serif',
          lineHeight: '1.2'
        }}>
          Site Map
        </h1>
        
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          color: palette.mutedText,
          fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Navigate our website with ease. Find all pages, resources, and treatment programs in one organized location.
        </p>
      </motion.section>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem'
      }}>
        {/* Site Structure Sections */}
        {siteStructure.map((section, sectionIndex) => (
          <motion.section 
            key={sectionIndex}
            variants={itemVariants}
            style={{
              marginBottom: '4rem'
            }}
          >
            {/* Section Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: `2px solid ${palette.primary}`
            }}>
              <div style={{
                backgroundColor: palette.primary,
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: palette.background
              }}>
                <FontAwesomeIcon icon={section.icon} size="lg" />
              </div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
                fontWeight: '600',
                color: palette.text,
                fontFamily: '"PT Serif", serif',
                margin: 0
              }}>
                {section.title}
              </h2>
            </div>

            {/* Pages Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {section.pages.map((page, pageIndex) => (
                <motion.div
                  key={pageIndex}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: `0 10px 30px ${palette.primary}20`
                  }}
                  style={{
                    backgroundColor: palette.surface,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: `1px solid ${palette.surface}`,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = palette.background;
                    e.currentTarget.style.borderColor = palette.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = palette.surface;
                    e.currentTarget.style.borderColor = palette.surface;
                  }}
                >
                  <Link 
                    to={page.path}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem'
                    }}>
                      <div style={{
                        backgroundColor: `${palette.primary}20`,
                        borderRadius: '12px',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: palette.primary,
                        flexShrink: 0
                      }}>
                        <FontAwesomeIcon icon={page.icon} size="lg" />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem'
                        }}>
                          <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            color: palette.text,
                            margin: 0,
                            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                          }}>
                            {page.title}
                          </h3>
                          <FontAwesomeIcon 
                            icon={faChevronRight} 
                            style={{ 
                              color: palette.primary,
                              fontSize: '0.8rem'
                            }} 
                          />
                        </div>
                        
                        <p style={{
                          fontSize: '0.9rem',
                          lineHeight: '1.5',
                          color: palette.mutedText,
                          margin: 0,
                          fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                        }}>
                          {page.description}
                        </p>
                        
                        <div style={{
                          fontSize: '0.8rem',
                          color: palette.primary,
                          marginTop: '0.5rem',
                          fontFamily: 'monospace',
                          opacity: 0.8
                        }}>
                          {page.path}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Utility Pages Section */}
        <motion.section 
          variants={itemVariants}
          style={{
            backgroundColor: palette.surface,
            borderRadius: '20px',
            padding: '3rem',
            marginTop: '3rem'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 1.8rem)',
            fontWeight: '600',
            color: palette.text,
            fontFamily: '"PT Serif", serif',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Additional Pages
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {utilityPages.map((page, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                style={{
                  backgroundColor: palette.background,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  border: `1px solid ${palette.surface}`,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = palette.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = palette.surface;
                }}
              >
                <Link 
                  to={page.path}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}
                >
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: palette.text,
                    marginBottom: '0.5rem',
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                  }}>
                    {page.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    color: palette.mutedText,
                    margin: 0,
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                  }}>
                    {page.description}
                  </p>
                  
                  <div style={{
                    fontSize: '0.75rem',
                    color: palette.primary,
                    marginTop: '0.5rem',
                    fontFamily: 'monospace',
                    opacity: 0.8
                  }}>
                    {page.path}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Contact Section */}
        <motion.section 
          variants={itemVariants}
          style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            marginTop: '3rem',
            backgroundColor: palette.text,
            borderRadius: '20px',
            color: palette.background
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 1.8rem)',
            fontWeight: '600',
            color: palette.background,
            fontFamily: '"PT Serif", serif',
            marginBottom: '1rem'
          }}>
            Need Help Finding What You are Looking For?
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            color: palette.surface,
            marginBottom: '2rem',
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            Our team is here to help you navigate our resources and find the information you need.
          </p>

          <a 
            href={siteData.site.phoneHref}
            style={{
              backgroundColor: palette.primary,
              color: palette.text,
              border: 'none',
              borderRadius: '50px',
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = palette.accent;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = palette.primary;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <FontAwesomeIcon icon={faPhone} />
            {siteData.site.ctaDefault.label}
          </a>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default SiteMap;
