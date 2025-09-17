import React, { useState, useEffect } from 'react';
import { getImagePath } from '../../utils/imagePaths.js';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../contexts/DarkModeContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPrescriptionBottle, 
  faShieldAlt, 
  faUsers, 
  faBrain,
  faHandshake,
  faLightbulb,
  faArrowRight,
  faCheck,
  faRoad,
  faHome,
  faGraduationCap,
  faHeart,
  faAward,
  faClock,
  faUserMd,
  faLeaf,
  faPalette,
  faRunning,
  faPlay
} from '@fortawesome/free-solid-svg-icons';
import ContactSection from '../../components/ContactSection.jsx';
import siteData from '../../../json/mainSiteData.json';

const SubstanceUseDisorder = () => {
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
  const programData = siteData.pages.programs.sections[0].items.find(item => item.id === 'substance-use-disorder');

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
          backgroundImage: `url(${getImagePath('/Images/p1.jpg')})`,
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
            Substance Use Disorder
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
            Built on over 35 years of clinical excellence at Prescott House
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
              {programData?.introHeading || 'Clinical Excellence in Recovery'}
            </h2>
            
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: palette.mutedText,
              marginBottom: '1.25rem'
            }}>
              {programData?.introText?.[0] || 'Drug and alcohol treatment rooted in over 35 years of clinical excellence. As part of Prescott House, we help individuals break free from the cycle of addiction through structure, accountability, and deep, trauma-informed healing.'}
            </p>
            
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: palette.mutedText
            }}>
              {programData?.introText?.[1] || 'Whether you\'re struggling with alcohol, opioids, stimulants, or a mix of substances our program meets you exactly where you are and helps you build a life you want to stay sober for.'}
            </p>
          </div>

          {/* Right Image */}
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
              src={getImagePath('/Images/g2.jpg')} 
              alt="Treatment environment" 
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

      {/* Substance Types Section */}
      <section 
        ref={createObserver('substances')}
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
            transform: sectionsVisible.substances ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.substances ? 1 : 0,
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
              Comprehensive <span style={{ color: palette.primary }}>Addiction Treatment</span>
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.7',
              color: palette.mutedText,
              maxWidth: '800px',
              margin: '0 auto 3rem auto'
            }}>
              {programData?.details[0] || 'Care for alcohol, opioids, stimulants, and polysubstance use.'}
            </p>
          </div>

          {/* Substance Pills */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: windowWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginTop: '3rem'
          }}>
            {(programData?.substanceTypes || [
              { text: 'Alcohol addiction', icon: 'faPrescriptionBottle' },
              { text: 'Opioid dependency', icon: 'faUserMd' },
              { text: 'Stimulant abuse', icon: 'faBrain' },
              { text: 'Polysubstance use', icon: 'faLeaf' },
              { text: 'Prescription drugs', icon: 'faPrescriptionBottle' },
              { text: 'Co-occurring disorders', icon: 'faHeart' }
            ]).map((substance, index) => {
              const iconMap = {
                faPrescriptionBottle,
                faUserMd,
                faBrain,
                faLeaf,
                faHeart
              };
              const iconComponent = iconMap[substance.icon] || faPrescriptionBottle;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: palette.background,
                    borderRadius: '25px',
                    padding: '1rem 1.5rem',
                    transform: sectionsVisible.substances ? 'translateY(0)' : 'translateY(30px)',
                    opacity: sectionsVisible.substances ? 1 : 0,
                    transition: `all 0.6s ease-out ${index * 0.1}s`,
                    textAlign: 'center'
                  }}
                >
                  <FontAwesomeIcon 
                    icon={iconComponent} 
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
                    {substance.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section 
        ref={createObserver('video')}
        style={{
          padding: '5rem 2rem',
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        <div style={{
          transform: sectionsVisible.video ? 'translateY(0)' : 'translateY(40px)',
          opacity: sectionsVisible.video ? 1 : 0,
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
            {programData?.videoSection?.heading || 'Program'} <span style={{ color: palette.primary }}>Overview</span>
          </h2>
          
          {/* Video Section */}
          {programData?.media?.placeholder === false && programData?.media?.embedUrl ? (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '16/9',
              backgroundColor: palette.surface
            }}>
              <iframe
                width="100%"
                height="100%"
                src={programData.media.embedUrl}
                title={programData?.videoSection?.title || 'Program Overview Video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  border: 'none',
                  borderRadius: '16px'
                }}
              />
            </div>
          ) : (
            <div style={{
              backgroundColor: palette.surface,
              borderRadius: '16px',
              padding: '4rem 2rem',
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '16/9',
              maxWidth: '800px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
            onClick={() => {
              if (programData?.media?.youtubeUrl) {
                window.open(programData.media.youtubeUrl, '_blank');
              }
            }}
            >
              <div style={{
                textAlign: 'center'
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
                  color: palette.text
                }}>
                  <FontAwesomeIcon icon={faPlay} size="2x" />
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '300',
                  marginBottom: '1rem',
                  color: palette.text,
                  fontFamily: '"PT Serif", serif'
                }}>
                  {programData?.videoSection?.title || 'Learn About Our Approach'}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: palette.mutedText,
                  lineHeight: '1.6'
                }}>
                  {programData?.videoSection?.description || 'Discover how our comprehensive program helps individuals achieve lasting recovery through evidence-based treatment and compassionate care.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Long-Term Treatment Section */}
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
              src={getImagePath('/Images/p2.jpg')} 
              alt="Long-term treatment environment" 
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
                Why Long-Term
                <br />
                <span style={{ color: '#FCFCFA' }}>Treatment Matters</span>
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
              {programData?.whyLongTermIntro || programData?.whyLongTerm || 'Long-term treatment offers a comprehensive approach to healing. It provides ample time to develop coping strategies, build resilience, and make meaningful changes. Extended care helps individuals move beyond mere symptom management to achieve genuine, lasting recovery.'}
            </p>

            {(programData?.whyLongTermFeatures || [
              {
                icon: 'faClock',
                title: 'Time to Heal',
                description: 'Adequate time to develop lasting coping strategies and resilience'
              },
              {
                icon: 'faBrain',
                title: 'Deep Recovery',
                description: 'Move beyond symptom management to genuine transformation'
              },
              {
                icon: 'faAward',
                title: 'Proven Results',
                description: 'Evidence-based approach with decades of success'
              }
            ]).map((approach, index) => {
              const iconMap = {
                faClock,
                faBrain,
                faAward
              };
              const iconComponent = iconMap[approach.icon] || faClock;
              return (
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
                  <FontAwesomeIcon icon={iconComponent} size="sm" />
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Recovery Journey Section */}
      <section 
        ref={createObserver('journey')}
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
            transform: sectionsVisible.journey ? 'translateY(0)' : 'translateY(40px)',
            opacity: sectionsVisible.journey ? 1 : 0,
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
              Your <span style={{ color: palette.primary }}>Recovery Journey</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: palette.mutedText,
              maxWidth: '700px',
              margin: '0 auto 3rem auto'
            }}>
              {programData?.journeyIntro || 'Our structured four-phase approach guides you from initial detox through long-term aftercare, ensuring comprehensive support at every step.'}
            </p>
          </div>

          {/* Journey Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: windowWidth <= 768 ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem'
          }}>
            {(programData?.journey || [
              {
                phase: 'Phase One: Detox',
                detail: 'If needed, we coordinate safe, medically supervised detox with trusted providers before entry into residential care.'
              },
              {
                phase: 'Phase Two: Residential Treatment',
                detail: 'Live on-site and engage in daily clinical programming, including individual and group therapy, trauma work, peer support, and holistic wellness.'
              },
              {
                phase: 'Phase Three: Outpatient/IOP',
                detail: 'Step down gradually into less intensive treatment while practicing real-world responsibility with continued support.'
              },
              {
                phase: 'Phase Four: Aftercare',
                detail: 'Receive a tailored plan for life post-treatment — including housing, employment assistance, therapy referrals, and alumni engagement.'
              }
            ]).map((step, index) => {
              const icons = [faUserMd, faHome, faGraduationCap, faRoad];
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: palette.background,
                    borderRadius: '16px',
                    padding: '2rem',
                    transform: sectionsVisible.journey ? 'translateY(0)' : 'translateY(40px)',
                    opacity: sectionsVisible.journey ? 1 : 0,
                    transition: `all 0.8s ease-out ${0.2 + (index * 0.1)}s`,
                    cursor: 'pointer',
                    textAlign: 'left'
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
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: '#FCFCFA'
                  }}>
                    <FontAwesomeIcon icon={icons[index]} size="lg" />
                  </div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: palette.text,
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                  }}>
                    {step.phase}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    color: palette.mutedText
                  }}>
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clinical Features Section */}
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
              src={getImagePath('/Images/p5.jpg')} 
              alt="Clinical features" 
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
              Clinical <span style={{ color: palette.primary }}>Features</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: palette.mutedText,
              marginBottom: '2.5rem'
            }}>
              {programData?.clinicalFeaturesIntro || 'Our comprehensive clinical approach combines evidence-based therapies with holistic wellness practices to address the whole person.'}
            </p>

            {/* Clinical Features */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {(programData?.clinicalFeatures || [
                'Trauma-Informed Therapy (CBT, DBT, brain spotting)',
                'Life Skills and Vocational Readiness',
                'Health and Wellness Activities',
                '12-Step Integration and Peer Support',
                'Expressive Therapy: Art, Movement, Mindfulness'
              ]).map((feature, index) => {
                const icons = [faBrain, faGraduationCap, faRunning, faUsers, faPalette];
                return (
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
                      icon={icons[index] || faCheck} 
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
                );
              })}
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
              {programData?.ctaHeading ? programData.ctaHeading.split(' ').slice(0, -3).join(' ') : 'Build a Life Worth'} <span style={{ color: palette.primary }}>{programData?.ctaHeading ? programData.ctaHeading.split(' ').slice(-3).join(' ') : 'Staying Sober For'}</span>
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.7',
              color: palette.surface,
              marginBottom: '2.5rem'
            }}>
              {programData?.details?.[1] || 'We meet clients where they are and help build a life worth staying sober for.'} {programData?.ctaText || 'Our comprehensive program provides the structure, support, and clinical excellence you need for lasting recovery.'}
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
              {siteData.site.ctaDefault.label}
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection 
        heading={programData?.contactHeading || 'Ready to begin recovery'}
        subheading={programData?.contactSubheading || 'Take the first step toward building a life worth staying sober for. Our experienced team is here to guide you through every phase of your recovery journey with compassion and clinical excellence.'}
        phoneNumber={siteData.site.phone}
        phoneHref={siteData.site.phoneHref}
        email="info@prescotthouse.com"
        showMotion={true}
        rotatingWords={programData?.contactRotatingWords || ['recovery', 'sobriety', 'healing', 'growth', 'transformation']}
      />
    </motion.div>
  );
};

export default SubstanceUseDisorder;
