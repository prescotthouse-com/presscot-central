import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../contexts/DarkModeContext.jsx';
import { getImagePath } from '../../utils/imagePaths.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBriefcase, 
  faUsers, 
  faGraduationCap,
  faHandshake,
  faHeart,
  faMapMarkerAlt,
  faArrowRight,
  faCheck,
  faClock,
  faAward,
  faLightbulb,
  faUserFriends,
  faBalanceScale,
  faChartLine,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import ContactSection from '../../components/ContactSection.jsx';
import siteData from '../../../json/mainSiteData.json';

const Careers = () => {
  const { palette } = useDarkMode();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [sectionsVisible, setSectionsVisible] = useState({});

  // Ensure page starts at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive breakpoints
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024 && windowWidth > 768;
  const isDesktop = windowWidth > 1024;

  // Get careers data from JSON
  const employmentData = siteData.employment;
  const benefitsData = siteData.benefits;
  const jobsData = siteData.jobs;
  const ctaData = siteData.callToAction;

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

  // Benefits icon mapping
  const benefitIcons = [faGraduationCap, faUserFriends, faAward, faBalanceScale];

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
          backgroundImage: `url(${getImagePath('/Images/careers1.jpg')})`,
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
            {employmentData?.title || 'Careers'}
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
            {employmentData?.subtitle || 'Join our team of dedicated professionals'}
          </motion.p>
        </div>
      </motion.section>

      {/* Introduction Section */}
      <section 
        ref={createObserver('intro')}
        style={{
          padding: isMobile ? '3rem 2rem' : isTablet ? '4rem 3rem' : '4rem 4rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2rem' : '2.5rem',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <div style={{
            transform: sectionsVisible.intro ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.intro ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
              fontWeight: '300',
              marginBottom: '1.5rem',
              fontFamily: '"PT Serif", serif',
              color: palette.text,
              lineHeight: '1.3'
            }}>
              {employmentData?.headline || 'Join Our Mission'}
            </h2>
            
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: palette.mutedText,
              marginBottom: '2rem'
            }}>
              {employmentData?.description || 'Join a team that\'s on the rise, where every day offers new challenges and learning opportunities.'}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: palette.surface,
              borderRadius: '12px',
              padding: '1rem'
            }}>
              <div style={{
                backgroundColor: palette.primary,
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: palette.background,
                flexShrink: 0
              }}>
                <FontAwesomeIcon icon={faHeart} size="sm" />
              </div>
              <p style={{
                fontSize: '0.9rem',
                color: palette.text,
                margin: 0,
                fontWeight: '500'
              }}>
                Make a difference in the lives of those seeking recovery and healing
              </p>
            </div>
          </div>

          {/* Right - Company Values */}
          <div style={{
            transform: sectionsVisible.intro ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.intro ? 1 : 0,
            transition: 'all 0.8s ease-out 0.2s'
          }}>
            <div style={{
              backgroundColor: palette.surface,
              borderRadius: '16px',
              padding: isMobile ? '1.5rem' : '2rem'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: palette.text,
                fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                textAlign: 'center'
              }}>
                Our Values
              </h3>
              
              {[
                { icon: faHeart, text: 'Compassionate Care' },
                { icon: faAward, text: 'Clinical Excellence' },
                { icon: faUsers, text: 'Team Collaboration' },
                { icon: faLightbulb, text: 'Continuous Growth' }
              ].map((value, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: index === 3 ? '0' : '1rem'
                  }}
                >
                  <FontAwesomeIcon 
                    icon={value.icon} 
                    style={{ 
                      color: palette.primary,
                      fontSize: '0.9rem'
                    }} 
                  />
                  <span style={{
                    color: palette.text,
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    {value.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={createObserver('benefits')}
        style={{
          backgroundColor: palette.surface,
          padding: isMobile ? '3rem 2rem' : '4rem 2rem',
          margin: '0',
          maxWidth: 'none'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            transform: sectionsVisible.benefits ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.benefits ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: '300',
              marginBottom: '1rem',
              fontFamily: '"PT Serif", serif',
              color: palette.text,
              lineHeight: '1.3'
            }}>
              {benefitsData?.title || 'Why Choose Us?'}
            </h2>
          </div>

          {/* Benefits Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
            gap: isMobile ? '1.5rem' : '2rem'
          }}>
            {benefitsData?.items?.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{
                  backgroundColor: palette.background,
                  borderRadius: '16px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  transform: sectionsVisible.benefits ? 'translateY(0)' : 'translateY(40px)',
                  opacity: sectionsVisible.benefits ? 1 : 0,
                  transition: `all 0.8s ease-out ${0.2 + (index * 0.1)}s`,
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  backgroundColor: palette.primary,
                  borderRadius: '50%',
                  width: isMobile ? '50px' : '60px',
                  height: isMobile ? '50px' : '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: palette.background
                }}>
                  <FontAwesomeIcon icon={benefitIcons[index]} size="lg" />
                </div>
                <h3 style={{
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: palette.text,
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: palette.mutedText,
                  margin: 0
                }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section 
        ref={createObserver('positions')}
        style={{
          padding: isMobile ? '3rem 2rem' : '5rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          transform: sectionsVisible.positions ? 'translateY(0)' : 'translateY(40px)',
          opacity: sectionsVisible.positions ? 1 : 0,
          transition: 'all 0.8s ease-out'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: '300',
            marginBottom: '1rem',
            fontFamily: '"PT Serif", serif',
            color: palette.text,
            lineHeight: '1.3'
          }}>
            {jobsData?.title || 'Current Openings'}
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: palette.mutedText,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {jobsData?.subtitle || 'Explore our available positions'}
          </p>
        </div>

        {/* Job Listings */}
        {jobsData?.list && jobsData.list.length > 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {jobsData.list.map((job, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01, boxShadow: `0 10px 30px ${palette.primary}20` }}
                style={{
                  backgroundColor: palette.surface,
                  borderRadius: '16px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  transform: sectionsVisible.positions ? 'translateY(0)' : 'translateY(40px)',
                  opacity: sectionsVisible.positions ? 1 : 0,
                  transition: `all 0.8s ease-out ${0.2 + (index * 0.1)}s`,
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : isTablet ? '2fr 1fr' : '3fr 1fr',
                  gap: isMobile ? '1rem' : '2rem',
                  alignItems: 'center'
                }}>
                  {/* Job Details */}
                  <div>
                    <h3 style={{
                      fontSize: isMobile ? '1.2rem' : '1.4rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: palette.text,
                      fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                    }}>
                      {job.title}
                    </h3>
                    
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        color: palette.mutedText
                      }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: palette.primary }} />
                        {job.location}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        color: palette.mutedText
                      }}>
                        <FontAwesomeIcon icon={faBriefcase} style={{ color: palette.primary }} />
                        {job.department}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        color: palette.mutedText
                      }}>
                        <FontAwesomeIcon icon={faClock} style={{ color: palette.primary }} />
                        {job.type}
                      </div>
                    </div>
                    
                    <p style={{
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      color: palette.mutedText,
                      margin: 0
                    }}>
                      {job.description}
                    </p>
                  </div>

                  {/* Apply Button */}
                  <div style={{
                    textAlign: isMobile ? 'center' : 'right'
                  }}>
                    <a
                      href={job.apply?.url || '#'}
                      style={{
                        backgroundColor: palette.primary,
                        color: palette.background,
                        border: 'none',
                        borderRadius: '50px',
                        padding: isMobile ? '0.75rem 1.5rem' : '1rem 2rem',
                        fontSize: '0.9rem',
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
                      {job.apply?.label || 'Apply Now'}
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* No Positions Available */
          <div style={{
            textAlign: 'center',
            backgroundColor: palette.surface,
            borderRadius: '16px',
            padding: isMobile ? '2rem' : '3rem',
            transform: sectionsVisible.positions ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.positions ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            <div style={{
              backgroundColor: palette.primary,
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              color: palette.background
            }}>
              <FontAwesomeIcon icon={faBriefcase} size="2x" />
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '300',
              marginBottom: '1rem',
              color: palette.text,
              fontFamily: '"PT Serif", serif'
            }}>
              No Current Openings
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: palette.mutedText,
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              {jobsData?.emptyMessage || 'No open positions are available at the moment. Please check back soon.'}
            </p>
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      <section 
        ref={createObserver('cta')}
        style={{
          backgroundColor: palette.text,
          padding: isMobile ? '3rem 2rem' : '4rem 2rem',
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
              {ctaData?.headline || 'Ready to Join Our Team?'}
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.7',
              color: palette.surface,
              marginBottom: '2.5rem'
            }}>
              {ctaData?.description || 'Complete the form below and take the first step towards an exciting career with us! We\'re eager to connect.'}
            </p>

            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
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
                Call Us
              </a>
              
              <a 
                href="mailto:careers@prescotthouse.com"
                style={{
                  backgroundColor: 'transparent',
                  color: palette.background,
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
                  e.target.style.backgroundColor = palette.background;
                  e.target.style.color = palette.text;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = palette.background;
                }}
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection 
        heading="Interested in joining our team"
        subheading="Reach out to learn more about career opportunities at Prescott House. We're always looking for passionate individuals who want to make a difference in behavioral health."
        phoneNumber={siteData.site.phone}
        phoneHref={siteData.site.phoneHref}
        email="careers@prescotthouse.com"
        showMotion={true}
        rotatingWords={["team", "mission", "family", "community", "purpose"]}
      />
    </motion.div>
  );
};

export default Careers;
