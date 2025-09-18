import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { getImagePath } from '../utils/imagePaths.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import ContactSection from '../components/ContactSection.jsx';
import manifestoData from '../../json/prescott_house_manifesto.json';

const OurPrograms = () => {
  const { palette } = useDarkMode();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [sectionsVisible, setSectionsVisible] = useState({});

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // Intersection observer for scroll animations
  const createObserver = (sectionId) => {
    return (el) => {
      if (el && !sectionsVisible[sectionId]) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setSectionsVisible(prev => ({ ...prev, [sectionId]: true }));
              observer.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(el);
      }
    };
  };

  const containerStyle = {
    backgroundColor: palette.background,
    color: palette.text,
    minHeight: '100vh',
    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
  };

  const sectionStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: windowWidth <= 768 ? '2rem 1rem' : '3rem 2rem'
  };

  const manifestoSectionStyle = {
    marginBottom: '4rem',
    padding: '2rem',
    backgroundColor: palette.surface,
    borderRadius: '16px',
    borderLeft: `4px solid ${palette.primary}`
  };

  const headingStyle = {
    fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
    fontWeight: '600',
    color: palette.primary,
    marginBottom: '1.5rem',
    fontFamily: '"PT Serif", serif',
    lineHeight: '1.3'
  };

  const contentStyle = {
    fontSize: '1rem',
    lineHeight: '1.7',
    color: palette.text,
    marginBottom: '0'
  };

  // SEO keyword list (men's programs only)
  const seoKeywords = [
    'Prescott rehab centers',
    'Arizona addiction recovery',
    'Gambling addiction treatment Prescott',
    'Substance abuse rehab Arizona',
    'Drug treatment centers Prescott AZ',
    'Alcohol rehab Arizona',
    'Trauma-informed therapy Prescott',
    'Arizona dual diagnosis treatment',
    'Mental health rehab Prescott',
    'Behavioral health Prescott AZ',
    'Arizona residential treatment center',
    'Arizona recovery programs',
    'Holistic addiction recovery Arizona',
    'Arizona relapse prevention therapy',
    'Prescott recovery community',
    'Arizona intensive outpatient program (IOP)',
    'Arizona private rehab facilities',
    'Arizona family therapy addiction recovery',
    'Arizona men\'s rehab programs',
    'Arizona therapy for compulsive behavior',
    'Sex and love addiction support Prescott',
    'Arizona detox programs',
    'Arizona codependency counseling',
    'Arizona mental health support groups'
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={containerStyle}
    >
      {/* Hero Section */}
      <motion.section 
        variants={itemVariants}
        style={{
          position: 'relative',
          height: '70vh',
          backgroundImage: `url(${getImagePath('/Images/g5.jpg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(25, 25, 24, 0.7) 0%, rgba(25, 25, 24, 0.4) 100%)',
          zIndex: 1
        }} />
        
        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '0 2rem'
        }}>
          <motion.h1 
            variants={itemVariants}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '300',
              color: '#FCFCFA',
              marginBottom: '1.5rem',
              fontFamily: '"PT Serif", serif',
              lineHeight: '1.2'
            }}
          >
            Our Programs
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              color: '#F4F1EA',
              fontWeight: '300',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Comprehensive addiction recovery and behavioral health treatment in Arizona
          </motion.p>
        </div>
      </motion.section>

      {/* Manifesto Content */}
      <section style={sectionStyle}>
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3vw, 2.5rem)',
            fontWeight: '300',
            color: palette.text,
            marginBottom: '1rem',
            fontFamily: '"PT Serif", serif'
          }}>
            {manifestoData.title}
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <FontAwesomeIcon 
              icon={faQuoteLeft} 
              style={{ 
                fontSize: '1.5rem', 
                color: palette.primary 
              }} 
            />
            <p style={{
              fontSize: '1.1rem',
              color: palette.mutedText,
              fontStyle: 'italic'
            }}>
              A declaration of hope and transformation
            </p>
          </div>
        </div>

        {/* Manifesto Sections */}
        {manifestoData.sections.map((section, index) => (
          <motion.div
            key={index}
            ref={createObserver(`section-${index}`)}
            variants={itemVariants}
            style={{
              ...manifestoSectionStyle,
              transform: sectionsVisible[`section-${index}`] ? 'translateY(0)' : 'translateY(40px)',
              opacity: sectionsVisible[`section-${index}`] ? 1 : 0,
              transition: 'all 0.8s ease-out'
            }}
          >
            <h3 style={headingStyle}>
              {section.heading}
            </h3>
            <p style={contentStyle}>
              {section.content}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Program Images Section */}
      <section 
        ref={createObserver('images')}
        style={{
          backgroundColor: palette.surface,
          padding: '4rem 2rem',
          margin: '0',
          maxWidth: 'none'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            transform: sectionsVisible.images ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.images ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: '300',
              marginBottom: '3rem',
              fontFamily: '"PT Serif", serif',
              color: palette.text,
              lineHeight: '1.3',
              textAlign: 'center'
            }}>
              Our Treatment <span style={{ color: palette.primary }}>Environment</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: windowWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {[
              {
                src: getImagePath('/Images/p1.jpg'),
                alt: 'Arizona addiction recovery environment - Prescott House residential treatment center',
                title: 'Residential Treatment'
              },
              {
                src: getImagePath('/Images/p2.jpg'),
                alt: 'Behavioral health treatment in Arizona - trauma-informed therapy and dual diagnosis care',
                title: 'Clinical Excellence'
              },
              {
                src: getImagePath('/Images/p3.jpg'),
                alt: 'Substance abuse rehab Arizona - holistic addiction recovery and mental health support',
                title: 'Holistic Approach'
              }
            ].map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{
                  backgroundColor: palette.background,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transform: sectionsVisible.images ? 'translateY(0)' : 'translateY(40px)',
                  opacity: sectionsVisible.images ? 1 : 0,
                  transition: `all 0.8s ease-out ${0.2 + (index * 0.1)}s`,
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  height: '250px',
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }} />
                <div style={{
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: palette.text,
                    margin: 0,
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                  }}>
                    {image.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Keywords Section */}
      <section 
        ref={createObserver('keywords')}
        style={{
          padding: '3rem 2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        <div style={{
          transform: sectionsVisible.keywords ? 'translateY(0)' : 'translateY(40px)',
          opacity: sectionsVisible.keywords ? 1 : 0,
          transition: 'all 0.8s ease-out',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '0.9rem',
            color: palette.mutedText,
            marginBottom: '1.5rem',
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
          }}>
            Prescott House has helped users searching for:
          </p>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {seoKeywords.map((keyword, index) => (
              <span
                key={index}
                style={{
                  fontSize: '0.8rem',
                  color: palette.mutedText,
                  backgroundColor: palette.surface,
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  display: 'inline-block',
                  margin: '0.2rem',
                  opacity: 0.7,
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection 
        heading="Ready to begin your journey"
        subheading="Take the first step toward recovery with Arizona's premier addiction treatment center. Our comprehensive programs combine evidence-based therapy with compassionate care."
        phoneNumber="866 425 2470"
        phoneHref="tel:18664252470"
        email="info@prescotthouse.com"
        showMotion={true}
        rotatingWords={["journey", "recovery", "healing", "transformation", "renewal"]}
      />
    </motion.div>
  );
};

export default OurPrograms;
