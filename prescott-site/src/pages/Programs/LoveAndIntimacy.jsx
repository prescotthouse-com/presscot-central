import React, { useState, useEffect } from 'react';
import { getImagePath } from '../../utils/imagePaths.js';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../contexts/DarkModeContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faShieldAlt, 
  faUsers, 
  faBrain,
  faHandshake,
  faLightbulb,
  faArrowRight,
  faCheck,
  faRoad
} from '@fortawesome/free-solid-svg-icons';
import ContactSection from '../../components/ContactSection.jsx';
import siteData from '../../../json/mainSiteData.json';

const LoveAndIntimacy = () => {
  const { palette } = useDarkMode();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [sectionsVisible, setSectionsVisible] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [approachSectionOffset, setApproachSectionOffset] = useState(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll for parallax effects
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          
          // Get the approach section position for parallax
          const approachSection = document.querySelector('[data-section="approach"]');
          if (approachSection) {
            const rect = approachSection.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            setApproachSectionOffset(sectionTop);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax effects only when approach section is in view
  const approachScrollProgress = Math.max(0, scrollY - approachSectionOffset + window.innerHeight * 0.5);
  const parallaxOffset = approachScrollProgress * 0.15;
  const tiltAngle = Math.sin(approachScrollProgress * 0.001) * 0.8;

  // Get program data from JSON
  const programData = siteData.pages.programs.sections[0].items.find(item => item.id === 'love-and-intimacy');

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
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
          backgroundImage: `url(${getImagePath('/Images/l1.jpg')})`,
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
            Love and Intimacy
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
            Built on over 35 years of behavioral health excellence at Prescott House
          </motion.p>
        </div>
      </motion.section>

      {/* Introduction Section */}
      <section 
        ref={createObserver('intro')}
        style={{
          padding: '4rem 4rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: windowWidth <= 768 ? '1fr' : '1fr 1fr',
          gap: '2.5rem',
          alignItems: 'flex-start'
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
              Clinically Sophisticated Program
            </h2>
            
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: palette.mutedText,
              marginBottom: '1.25rem'
            }}>
              Our long-term, clinically sophisticated program is designed for individuals seeking true healing from compulsive patterns in relationships, sex, and emotional dependency.
            </p>
            
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: palette.mutedText
            }}>
              Whether you're struggling with compulsive pornography use, infidelity, love addiction, or intimacy avoidance we're here to help you rebuild trust, self-worth, and connection from the inside out.
            </p>
          </div>

          {/* Right Image with Parallax */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            transform: sectionsVisible.intro ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.intro ? 1 : 0,
            transition: 'all 0.8s ease-out 0.2s',
            height: 'auto'
          }}>
            <img 
              src={getImagePath('/Images/g6.jpg')} 
              alt="Therapeutic environment" 
              style={{
                width: '120%',
                height: '120%',
                objectFit: 'cover',
                display: 'block',
                transform: 'scale(1.1)',
                transition: 'transform 0.1s ease-out',
                transformOrigin: 'center center'
              }}
            />
          </div>
        </div>
      </section>

      {/* Feeling Stuck Section */}
      <section 
        ref={createObserver('stuck')}
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
            transform: sectionsVisible.stuck ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.stuck ? 1 : 0,
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
              Feeling Stuck in Cycles of Love, Sex, or <span style={{ color: palette.primary }}>Intimacy Addiction</span>?
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.7',
              color: palette.mutedText,
              maxWidth: '800px',
              margin: '0 auto 3rem auto'
            }}>
              If your relationships feel driven by obsession, secrecy, or shame… if you find yourself stuck in destructive sexual behaviors or unable to form healthy connections… you're not alone.
            </p>
          </div>

          {/* Symptoms Pills */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: windowWidth <= 768 ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.5rem',
            marginTop: '3rem'
          }}>
            {[
              { text: 'Compulsive pornography use', icon: faBrain },
              { text: 'Infidelity patterns', icon: faHeart },
              { text: 'Love addiction cycles', icon: faRoad },
              { text: 'Intimacy avoidance', icon: faShieldAlt },
              { text: 'Emotional dependency', icon: faUsers },
              { text: 'Relationship obsession', icon: faLightbulb }
            ].map((symptom, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: palette.background,
                  borderRadius: '25px',
                  padding: '1rem 1.5rem',
                  transform: sectionsVisible.stuck ? 'translateY(0)' : 'translateY(30px)',
                  opacity: sectionsVisible.stuck ? 1 : 0,
                  transition: `all 0.6s ease-out ${index * 0.1}s`,
                  textAlign: 'center'
                }}
              >
                <FontAwesomeIcon 
                  icon={symptom.icon} 
                  style={{ 
                    color: palette.primary, 
                    marginRight: '0.75rem',
                    fontSize: '0.9rem'
                  }} 
                />
                <span style={{
                  color: palette.text,
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}>
                  {symptom.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section 
        data-section="approach"
        ref={createObserver('approach')}
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
          {/* Left - Image with Text Overlay and Parallax */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            order: windowWidth <= 768 ? 2 : 1,
            height: windowWidth <= 768 ? '400px' : '600px',
            minHeight: '500px',
            transform: `${sectionsVisible.approach ? 'translateY(0)' : 'translateY(40px)'} rotate(${tiltAngle}deg)`,
            opacity: sectionsVisible.approach ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            <img 
              src={getImagePath('/Images/g4.jpg')} 
              alt="Healing environment" 
              style={{
                width: '140%',
                height: '140%',
                objectFit: 'cover',
                display: 'block',
                transform: `translateY(${parallaxOffset - 50}px) scale(1.2)`,
                transition: 'transform 0.1s ease-out',
                transformOrigin: 'center center',
                position: 'relative',
                top: '-10%',
                left: '-10%'
              }}
            />
            
            {/* Text Overlay */}
            <div style={{
              position: 'absolute',
              left: 'clamp(1rem, 5vw, 2rem)',
              bottom: '15%',
              zIndex: 2
            }}>
              <h2 style={{
                fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                fontWeight: '700',
                color: '#FCFCFA',
                fontFamily: '"PT Serif", serif',
                lineHeight: '1.1',
                margin: 0
              }}>
                Our Approach to
                <br />
                <span style={{ color: '#FCFCFA' }}>Healing</span>
              </h2>
            </div>

            {/* Overlay for better text readability */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(25,25,24,0.4) 0%, rgba(25,25,24,0.1) 100%)',
              zIndex: 1
            }} />
          </div>

          {/* Right - Approach Cards */}
          <div style={{
            order: windowWidth <= 768 ? 1 : 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            justifyContent: 'flex-start'
          }}>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: palette.mutedText,
              marginBottom: '2rem',
              transform: sectionsVisible.approach ? 'translateY(0)' : 'translateY(40px)',
              opacity: sectionsVisible.approach ? 1 : 0,
              transition: 'all 0.8s ease-out 0.2s'
            }}>
              At Prescott House, we get to the root of these behaviors. Our program combines trusted methods with cutting-edge clinical approaches to support deep, trauma-focused healing.
            </p>

            {[
              {
                icon: faBrain,
                title: 'Trauma-Focused Healing',
                description: 'Cutting-edge modalities that help regulate the nervous system'
              },
              {
                icon: faRoad,
                title: '30-Task Model',
                description: 'Dr. Patrick Carnes framework for structured recovery'
              },
              {
                icon: faUsers,
                title: 'Community Support',
                description: 'Peer support in a therapeutic community environment'
              }
            ].map((approach, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: palette.surface,
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  transform: sectionsVisible.approach ? 'translateY(0)' : 'translateY(30px)',
                  opacity: sectionsVisible.approach ? 1 : 0,
                  transition: `all 0.6s ease-out ${0.4 + (index * 0.1)}s`,
                  marginBottom: index === 2 ? '0' : '1rem'
                }}
              >
                <div style={{
                  backgroundColor: palette.primary,
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FCFCFA',
                  flexShrink: 0
                }}>
                  <FontAwesomeIcon icon={approach.icon} size="sm" />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: palette.text,
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                  }}>
                    {approach.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    color: palette.mutedText,
                    margin: 0
                  }}>
                    {approach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 30-Task Model Section */}
      <section 
        ref={createObserver('model')}
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
            transform: sectionsVisible.model ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.model ? 1 : 0,
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
              The <span style={{ color: palette.primary }}>30-Task Model</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: palette.mutedText,
              maxWidth: '700px',
              margin: '0 auto 3rem auto'
            }}>
              We follow the structured, progressive path developed by Dr. Patrick Carnes, helping clients move from identifying harmful behaviors to developing healthy intimacy and emotional integrity.
            </p>
          </div>

          {/* Process Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: windowWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {[
              {
                icon: faLightbulb,
                title: 'Identify Patterns',
                description: 'Recognize harmful behaviors and their triggers'
              },
              {
                icon: faShieldAlt,
                title: 'Build Boundaries',
                description: 'Develop healthy limits and self-protection'
              },
              {
                icon: faHandshake,
                title: 'Healthy Intimacy',
                description: 'Create authentic connections and trust'
              }
            ].map((step, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: palette.background,
                  borderRadius: '16px',
                  padding: '2rem',
                  transform: sectionsVisible.model ? 'translateY(0)' : 'translateY(40px)',
                  opacity: sectionsVisible.model ? 1 : 0,
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
                  color: '#FCFCFA'
                }}>
                  <FontAwesomeIcon icon={step.icon} size="lg" />
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: palette.text,
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  color: palette.mutedText
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Features Section */}
      <section 
        ref={createObserver('features')}
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
            transform: sectionsVisible.features ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.features ? 1 : 0,
            transition: 'all 0.8s ease-out',
            height: windowWidth <= 768 ? '300px' : '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: '16px'
          }}>
            <img 
              src={getImagePath('/Images/p3.jpg')} 
              alt="Treatment approach" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Right - Content */}
          <div style={{
            transform: sectionsVisible.features ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.features ? 1 : 0,
            transition: 'all 0.8s ease-out 0.2s',
            height: 'fit-content'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: '300',
              marginBottom: '2rem',
              fontFamily: '"PT Serif", serif',
              color: palette.text,
              lineHeight: '1.3'
            }}>
              Comprehensive <span style={{ color: palette.primary }}>Treatment</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: palette.mutedText,
              marginBottom: '2.5rem'
            }}>
              These modalities help clients reconnect with their bodies, regulate their nervous systems, and resolve the unresolved trauma driving compulsive patterns.
            </p>

            {/* Treatment Features */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {[
                'Support for pornography compulsivity',
                'Infidelity recovery work',
                'Love addiction treatment',
                'Intimacy avoidance therapy',
                'Trauma-focused healing',
                'Nervous system regulation'
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transform: sectionsVisible.features ? 'translateY(0)' : 'translateY(20px)',
                    opacity: sectionsVisible.features ? 1 : 0,
                    transition: `all 0.5s ease-out ${0.4 + (index * 0.05)}s`
                  }}
                >
                  <FontAwesomeIcon 
                    icon={faCheck} 
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
                    {feature}
                  </span>
                </div>
              ))}
            </div>
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
              You Don't Have to <span style={{ color: palette.primary }}>Stay Stuck</span>
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.7',
              color: palette.surface,
              marginBottom: '2.5rem'
            }}>
              If you or someone you love is struggling with pornography addiction, compulsive sexual behavior, or intimacy issues, Truehold by Prescott House offers the space, care, and expertise to begin again with clarity, dignity, and a path forward.
            </p>

            <a 
              href="tel:18664252470"
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
              Call 866 425 2470
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection 
        heading="Ready to begin healing"
        subheading="Take the first step toward rebuilding trust, self-worth, and authentic connection. Our specialized team understands the complexity of love and intimacy disorders."
        phoneNumber="866 425 2470"
        phoneHref="tel:18664252470"
        email="info@prescotthouse.com"
        showMotion={true}
        rotatingWords={["healing", "recovery", "growth", "change", "transformation"]}
      />
    </motion.div>
  );
};

export default LoveAndIntimacy;
