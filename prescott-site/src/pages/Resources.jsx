import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBookOpen, 
  faBlog, 
  faQuestionCircle, 
  faExternalLinkAlt, 
  faPhone, 
  faLightbulb,
  faUsers,
  faHeart,
  faArrowRight,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';
import ContactSection from '../components/ContactSection.jsx';
import siteData from '../../json/mainSiteData.json';

const Resources = () => {
  const { palette } = useDarkMode();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [sectionsVisible, setSectionsVisible] = useState({});
  const resourcesData = siteData.pages.resources;

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
        staggerChildren: 0.2
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

  const getIconForResource = (label) => {
    if (label.toLowerCase().includes('blog')) return faBlog;
    if (label.toLowerCase().includes('faq')) return faQuestionCircle;
    return faBookOpen;
  };

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
          position: 'relative',
          height: '70vh',
          backgroundImage: 'url(/Images/g5.jpg)',
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
            {resourcesData.hero.heading}
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
            {resourcesData.hero.subheading}
          </motion.p>
        </div>
      </motion.section>

      {/* Introduction Section */}
      <section 
        ref={createObserver('intro')}
        style={{
          padding: '4rem 2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        <div style={{
          textAlign: 'center',
          transform: sectionsVisible.intro ? 'translateY(0)' : 'translateY(40px)',
          opacity: sectionsVisible.intro ? 1 : 0,
          transition: 'all 0.8s ease-out'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: '300',
            marginBottom: '2rem',
            fontFamily: '"PT Serif", serif',
            color: palette.text,
            lineHeight: '1.3'
          }}>
            Knowledge is <span style={{ color: palette.primary }}>Power in Recovery</span>
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: palette.mutedText,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Education plays a crucial role in successful recovery. Understanding addiction, mental health, and the recovery process empowers individuals and families to make informed decisions and maintain long-term sobriety.
          </p>
        </div>
      </section>

      {/* External Resources Section */}
      <section 
        ref={createObserver('external')}
        style={{
          backgroundColor: palette.surface,
          padding: '4rem 2rem',
          margin: '0',
          maxWidth: 'none'
        }}
      >
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            transform: sectionsVisible.external ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.external ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: '300',
              marginBottom: '2rem',
              fontFamily: '"PT Serif", serif',
              color: palette.text,
              lineHeight: '1.3'
            }}>
              {resourcesData.sections[0].heading}
            </h2>
          </div>

          {/* External Resource Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: windowWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {resourcesData.sections[0].items.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{
                  backgroundColor: palette.background,
                  borderRadius: '16px',
                  padding: '2rem',
                  transform: sectionsVisible.external ? 'translateY(0)' : 'translateY(40px)',
                  opacity: sectionsVisible.external ? 1 : 0,
                  transition: `all 0.8s ease-out ${0.2 + (index * 0.1)}s`,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  backgroundColor: palette.primary,
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  color: palette.background
                }}>
                  <FontAwesomeIcon icon={getIconForResource(item.label)} size="lg" />
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: palette.text,
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                }}>
                  {item.label}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: palette.mutedText,
                  marginBottom: '1.5rem'
                }}>
                  {item.label === 'Blog' && 
                    "Stay informed with our latest articles on addiction recovery, mental health, and wellness."
                  }
                  {item.label === 'FAQ' && 
                    "Find answers to commonly asked questions about our treatment programs and admission process."
                  }
                  {item.label === 'Reference Example' && 
                    "Explore additional resources and educational materials from trusted partners in behavioral health."
                  }
                </p>
                <a
                  href={item.href}
                  target={item.target || '_self'}
                  rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                  style={{
                    backgroundColor: palette.primary,
                    color: palette.background,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
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
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  Visit {item.label}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Topics Section */}
      <section 
        ref={createObserver('topics')}
        style={{
          padding: '5rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: windowWidth <= 768 ? '1fr' : '1fr 1fr',
          gap: '3rem',
          alignItems: 'flex-start'
        }}>
          {/* Left - Image */}
          <div style={{
            transform: sectionsVisible.topics ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.topics ? 1 : 0,
            transition: 'all 0.8s ease-out',
            height: windowWidth <= 768 ? '300px' : '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: '16px'
          }}>
            <img 
              src="/Images/p4.jpg" 
              alt="Educational resources" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Right - Support Topics */}
          <div style={{
            transform: sectionsVisible.topics ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.topics ? 1 : 0,
            transition: 'all 0.8s ease-out 0.2s'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: '300',
              marginBottom: '2rem',
              fontFamily: '"PT Serif", serif',
              color: palette.text,
              lineHeight: '1.3'
            }}>
              Educational <span style={{ color: palette.primary }}>Support</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: palette.mutedText,
              marginBottom: '2.5rem'
            }}>
              Our comprehensive educational resources help individuals and families understand addiction, mental health, and the recovery process.
            </p>

            {/* Support Topics */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {[
                'Understanding addiction science',
                'Family support and guidance',
                'Recovery planning tools',
                'Mental health education',
                'Aftercare resources',
                'Community support networks'
              ].map((topic, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transform: sectionsVisible.topics ? 'translateY(0)' : 'translateY(20px)',
                    opacity: sectionsVisible.topics ? 1 : 0,
                    transition: `all 0.5s ease-out ${0.4 + (index * 0.05)}s`
                  }}
                >
                  <FontAwesomeIcon 
                    icon={faLightbulb} 
                    style={{ 
                      color: palette.primary,
                      fontSize: '0.9rem'
                    }} 
                  />
                  <span style={{
                    color: palette.text,
                    fontSize: '1rem',
                    fontWeight: '400'
                  }}>
                    {topic}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section 
        ref={createObserver('additional')}
        style={{
          backgroundColor: palette.surface,
          padding: '4rem 2rem',
          margin: '0',
          maxWidth: 'none'
        }}
      >
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            transform: sectionsVisible.additional ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.additional ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: '300',
              marginBottom: '1.5rem',
              fontFamily: '"PT Serif", serif',
              color: palette.text,
              lineHeight: '1.3'
            }}>
              Additional <span style={{ color: palette.primary }}>Support</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: palette.mutedText,
              maxWidth: '700px',
              margin: '0 auto 3rem auto'
            }}>
              Beyond our treatment programs, we provide comprehensive educational materials and ongoing support resources.
            </p>
          </div>

          {/* Additional Resource Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: windowWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {[
              {
                icon: faLightbulb,
                title: 'Understanding Addiction',
                description: 'Learn about the science behind addiction and why professional treatment is essential for recovery.'
              },
              {
                icon: faUsers,
                title: 'Family Support',
                description: 'Resources and guidance for families supporting someone through addiction recovery.'
              },
              {
                icon: faGraduationCap,
                title: 'Recovery Planning',
                description: 'Tools and strategies for creating a comprehensive recovery plan that supports long-term wellness.'
              }
            ].map((resource, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: palette.background,
                  borderRadius: '16px',
                  padding: '2rem',
                  transform: sectionsVisible.additional ? 'translateY(0)' : 'translateY(40px)',
                  opacity: sectionsVisible.additional ? 1 : 0,
                  transition: `all 0.8s ease-out ${0.2 + (index * 0.1)}s`,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  backgroundColor: palette.primary,
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  color: palette.background
                }}>
                  <FontAwesomeIcon icon={resource.icon} size="lg" />
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: palette.text,
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                }}>
                  {resource.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  color: palette.mutedText
                }}>
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section 
        ref={createObserver('cta')}
        style={{
          backgroundColor: palette.text,
          padding: '4rem 2rem',
          margin: '0 0 4rem 0',
          maxWidth: 'none'
        }}
      >
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            transform: sectionsVisible.cta ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.cta ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: '300',
              marginBottom: '2rem',
              fontFamily: '"PT Serif", serif',
              color: palette.background,
              lineHeight: '1.3'
            }}>
              Need <span style={{ color: palette.primary }}>Personalized Guidance</span>?
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.7',
              color: palette.surface,
              marginBottom: '2.5rem'
            }}>
              Our team is here to answer your questions and help you find the right resources for your recovery journey.
            </p>

            <a 
              href={resourcesData.sections[1].phone.href}
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
              {resourcesData.sections[1].phone.label}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection 
        heading="Ready to learn more"
        subheading="Connect with our team to access personalized resources and guidance for your recovery journey. We're here to support you every step of the way."
        phoneNumber={resourcesData.sections[1].phone.label}
        phoneHref={resourcesData.sections[1].phone.href}
        email="info@prescotthouse.com"
        showMotion={true}
        rotatingWords={["more", "guidance", "support", "help", "resources"]}
      />
    </motion.div>
  );
};

export default Resources;