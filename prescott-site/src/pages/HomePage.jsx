import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faArrowRight, 
  faChevronLeft, 
  faChevronRight, 
  faHeart, 
  faDice, 
  faPrescriptionBottle,
  faShield,
  faUsers,
  faGraduationCap,
  faHandshake,
  faClock,
  faHome,
  faUserFriends,
  faAward,
  faLightbulb,
  faFileAlt,
  faComments,
  faCalendarCheck,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import ContactSection from '../components/ContactSection.jsx';
import siteData from '../../json/mainSiteData.json';

// Animated Text Component for pill hover effect
const AnimatedText = ({ text, isAnimating, palette, animationTime }) => {
  const letters = text.split('');
  const animationDuration = 600; // Slower - 600ms total animation
  const letterDelay = animationDuration / letters.length; // Delay between each letter
  const pauseDuration = 2000; // Long pause - 2 seconds between cycles
  
  return (
    <span style={{ display: 'inline-block' }}>
      {letters.map((letter, index) => {
        // Calculate if this letter should be animating based on time
        const letterStartTime = index * letterDelay;
        const letterEndTime = letterStartTime + 120; // Slower - each letter animates for 120ms
        const currentTime = (animationTime % (animationDuration + pauseDuration)) || 0;
        
        const isLetterAnimating = isAnimating && 
          currentTime >= letterStartTime && 
          currentTime <= letterEndTime;
        
        const animationProgress = isLetterAnimating 
          ? Math.sin(((currentTime - letterStartTime) / 120) * Math.PI)
          : 0;
        
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              transform: `scale(${1 + (animationProgress * 0.15)})`, // Much more subtle
              transition: 'transform 0.05s ease-out', // Slightly slower transition
              transformOrigin: 'center bottom',
              color: palette.text,
              fontWeight: '500',
              fontSize: '0.9rem',
              lineHeight: '1.3'
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        );
      })}
    </span>
  );
};

AnimatedText.propTypes = {
  text: PropTypes.string.isRequired,
  isAnimating: PropTypes.bool.isRequired,
  palette: PropTypes.object.isRequired,
  animationTime: PropTypes.number.isRequired
};

const HomePage = () => {
  const { palette } = useDarkMode();
  const homeData = siteData.pages.home;
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [scrollY, setScrollY] = useState(0);
  const [sectionOffset, setSectionOffset] = useState(0);
  const [hoveredPill, setHoveredPill] = useState(null);
  const [animationTime, setAnimationTime] = useState(0);
  const [pillsEntered, setPillsEntered] = useState(false);
  const [activeTimelineStep, setActiveTimelineStep] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [introVisible, setIntroVisible] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle zoom animation with requestAnimationFrame
  useEffect(() => {
    let startTime = Date.now();
    let animationId;
    
    const updateZoom = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % 60000) / 60000; // 60 second cycle (30s in, 30s out)
      
      // Create smooth back-and-forth motion
      const normalizedProgress = progress < 0.5 
        ? progress * 2 // First half: 0 to 1
        : 2 - (progress * 2); // Second half: 1 to 0
      
      // Apply easing
      const easedProgress = 0.5 * (1 - Math.cos(normalizedProgress * Math.PI));
      
      // Scale from 1 to 1.25
      const scale = 1 + (easedProgress * 0.25);
      setZoomScale(scale);
      
      animationId = requestAnimationFrame(updateZoom);
    };
    
    animationId = requestAnimationFrame(updateZoom);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Handle scroll for parallax effects and pill animation trigger
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          
          // Get the philosophy section position
          const philosophySection = document.querySelector('[data-section="philosophy"]');
          if (philosophySection) {
            const rect = philosophySection.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            setSectionOffset(sectionTop);
            
            // Trigger pill animation when section comes into view
            const isInView = rect.top < window.innerHeight * 0.8; // Trigger when 80% into view
            if (isInView && !pillsEntered) {
              setPillsEntered(true);
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call to set section offset
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pillsEntered]);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => 
        prev === homeData.sections[3].items.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [homeData.sections]);

  // Animation loop for pill text effect
  useEffect(() => {
    let animationFrame;
    let startTime = Date.now();
    
    const animate = () => {
      if (hoveredPill !== null) {
        const currentTime = Date.now() - startTime;
        setAnimationTime(currentTime);
      }
      animationFrame = requestAnimationFrame(animate);
    };
    
    if (hoveredPill !== null) {
      startTime = Date.now();
      animate();
    } else {
      setAnimationTime(0);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [hoveredPill]);

  const testimonialSection = homeData.sections.find(section => section.type === 'testimonialSlider');
  const cardLinksSection = homeData.sections.find(section => section.type === 'cardLinks');

  // Calculate parallax effects only when section is in view
  const sectionScrollProgress = Math.max(0, scrollY - sectionOffset + window.innerHeight * 0.5);
  const parallaxOffset = sectionScrollProgress * 0.15; // Very slow parallax movement
  const tiltAngle = Math.sin(sectionScrollProgress * 0.001) * 0.8; // Subtle tilt oscillation

  // Styles
  const heroStyle = {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FCFCFA',
    overflow: 'hidden'
  };

  const heroOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(25, 25, 24, 0.7) 0%, rgba(25, 25, 24, 0.4) 100%)',
    zIndex: 1
  };

  const heroContentStyle = {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    padding: '0 2rem'
  };

  const sectionStyle = {
    padding: '3rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const cardStyle = {
    backgroundColor: palette.background,
    borderRadius: '12px',
    padding: '1rem',
    aspectRatio: '1',
    transition: 'all 0.3s ease',
    border: `1px solid ${palette.surface}`,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  const buttonStyle = {
    backgroundColor: '#191918',
    color: '#FCFCFA',
    border: 'none',
    borderRadius: '50px',
    padding: '1rem 2rem',
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
  };

  const testimonialCardStyle = {
    backgroundColor: palette.surface,
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '0 auto',
    position: 'relative',
    height: '220px', // Fixed height instead of minHeight
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden' // Prevent content from breaking out
  };

  return (
    <div style={{ 
      backgroundColor: palette.background, 
      color: palette.text,
      minHeight: '100vh'
    }}>
      
      {/* Hero Section with Parallax */}
      <section style={heroStyle}>
        {/* Background Layer - Slowest with Zoom */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: 0,
          width: '100%',
          height: '130%',
          backgroundImage: 'url(/Images/par/back.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll',
          transform: `translate3d(0, ${scrollY * 0.4}px, 0) scale(${zoomScale})`,
          willChange: 'transform',
          zIndex: 1,
          transformOrigin: 'center center'
        }} />
        
        {/* Middle Layer - Medium Speed */}
        <div style={{
          position: 'absolute',
          top: '-5%',
          left: 0,
          width: '100%',
          height: '120%',
          backgroundImage: 'url(/Images/par/mid.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll',
          transform: `translate3d(0, ${scrollY * 0.25}px, 0)`,
          willChange: 'transform',
          zIndex: 2
        }} />
        
        {/* Front Layer - Fastest */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '110%',
          backgroundImage: 'url(/Images/par/front.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll',
          transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
          willChange: 'transform',
          zIndex: 3
        }} />
        
        {/* Content overlay - stays fixed */}
        <div style={{
          position: 'relative',
          zIndex: 4,
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          top: '-6%',
          paddingTop: windowWidth <= 768 ? '35vh' : '0'
        }}>
          {/* Since 1988 Text */}
          <div style={{
            fontSize: '0.8rem',
            fontWeight: '300',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#FCFCFA',
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
            textAlign: 'center',
            opacity: 0.9
          }}>
            Since 1988
          </div>
          
          {/* Company Emblem */}
          <div style={{
            marginBottom: '2rem'
          }}>
            <img 
              src="/Logos/emblem.png" 
              alt="Prescott House Emblem" 
              style={{
                maxWidth: windowWidth <= 768 ? '200px' : '280px',
                height: 'auto',
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
                transition: 'transform 0.3s ease'
              }}
            />
          </div>
        </div>
      </section>

      {/* Introduction Section - Redesigned */}
      <section 
        ref={(el) => {
          if (el && !introVisible) {
            const observer = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting) {
                  setIntroVisible(true);
                  observer.disconnect();
                }
              },
              { threshold: 0.3 }
            );
            observer.observe(el);
          }
        }}
        style={{
          ...sectionStyle,
          paddingTop: '4rem',
          paddingBottom: '4rem'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          {/* Header */}
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: '300',
            marginBottom: '3rem',
            fontFamily: '"PT Serif", serif',
            color: palette.text,
            lineHeight: '1.3',
            transform: introVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: introVisible ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            A Premier Behavioral <span style={{ color: palette.primary }}>Health Center</span>
            <br />
            in Prescott, Arizona
          </h2>

          {/* Content Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: windowWidth <= 768 ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* Left Card */}
            <div style={{
              backgroundColor: palette.surface,
              borderRadius: '16px',
              padding: '2.5rem',
              transform: introVisible ? 'translateY(0)' : 'translateY(40px)',
              opacity: introVisible ? 1 : 0,
              transition: 'all 0.9s ease-out 0.2s'
            }}>
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
                <FontAwesomeIcon icon={faHome} size="lg" />
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: palette.text,
                fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
              }}>
                Therapeutic Community
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: palette.mutedText,
                fontWeight: '300'
              }}>
                We provide a structured, supportive environment where individuals can heal from addiction and mental health challenges in a community setting.
              </p>
            </div>

            {/* Right Card */}
            <div style={{
              backgroundColor: palette.surface,
              borderRadius: '16px',
              padding: '2.5rem',
              transform: introVisible ? 'translateY(0)' : 'translateY(40px)',
              opacity: introVisible ? 1 : 0,
              transition: 'all 0.9s ease-out 0.4s'
            }}>
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
                <FontAwesomeIcon icon={faAward} size="lg" />
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: palette.text,
                fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
              }}>
                Proven Excellence
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: palette.mutedText,
                fontWeight: '300'
              }}>
                With over three decades of experience, we've helped thousands find lasting recovery through our comprehensive, evidence-based approach.
              </p>
            </div>
          </div>

          {/* Bottom Call-to-Action */}
          <div style={{
            transform: introVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: introVisible ? 1 : 0,
            transition: 'all 1s ease-out 0.6s'
          }}>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: palette.text,
              fontWeight: '300',
              marginBottom: '2rem',
              maxWidth: '700px',
              margin: '0 auto 2rem auto'
            }}>
              Located in the serene mountains of Arizona, Prescott House offers a unique healing environment where individuals can rebuild their lives with dignity, purpose, and lasting change.
            </p>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              color: palette.primary,
              fontSize: '0.9rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              Prescott, Arizona
            </div>
          </div>
        </div>
      </section>

      {/* Programs Cards Section */}
      <section style={{ 
        padding: '3rem 2rem',
        backgroundColor: palette.surface,
        borderRadius: '0',
        margin: '0',
        maxWidth: 'none'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: windowWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {cardLinksSection?.items.map((program, index) => {
              const icons = [faPrescriptionBottle, faDice, faHeart];
              const images = ['/Images/g5.jpg', '/Images/p6.jpg', '/Images/p4.jpg'];
              
              return (
                <div 
                  key={index}
                  style={cardStyle}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-5px)';
                    e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    marginBottom: '0.75rem',
                    fontWeight: '600',
                    color: palette.text,
                    textAlign: 'center'
                  }}>
                    {program.title}
                  </h3>
                  <p style={{ 
                    marginBottom: 'auto',
                    lineHeight: '1.5',
                    color: palette.mutedText,
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    flex: 1
                  }}>
                    {program.description}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    marginTop: '1.5rem'
                  }}>
                    <a 
                      href={program.href} 
                      style={{
                        backgroundColor: palette.surface,
                        color: '#191918',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = palette.mutedText;
                        e.target.style.color = palette.background;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = palette.surface;
                        e.target.style.color = '#191918';
                      }}
                    >
                      Learn More
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section with Pills */}
      <section data-section="philosophy" style={{
        padding: '5rem 2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: windowWidth <= 768 ? '1fr' : '1fr 1fr',
          gap: '3rem',
          alignItems: 'flex-start'
        }}>
          {/* Left side - Image */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            order: windowWidth <= 768 ? 2 : 1,
            height: '100%',
            transform: `rotate(${tiltAngle}deg)`,
            transition: 'transform 0.1s ease-out'
          }}>
            <img 
              src="/Images/g3.jpg" 
              alt="Prescott House facility" 
              style={{
                width: '120%',
                height: '120%',
                objectFit: 'cover',
                display: 'block',
                transform: `translateY(${parallaxOffset}px) scale(1.1)`,
                transition: 'transform 0.1s ease-out',
                transformOrigin: 'center center'
              }}
            />
            
            {/* Overlay heading on bottom left */}
            <div style={{
              position: 'absolute',
              left: 'clamp(1rem, 5vw, 2rem)',
              bottom: '15%',
              zIndex: 2
            }}>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: '700',
                color: '#FCFCFA',
                fontFamily: '"PT Serif", serif',
                lineHeight: '1.1',
                margin: 0
              }}>
                What Sets Us
                <br />
                Apart
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

          {/* Right side - Pill Stack */}
          <div style={{ 
            order: windowWidth <= 768 ? 1 : 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            minHeight: '400px',
            justifyContent: 'flex-start'
          }}>
            
            {[
              { 
                icon: faClock, 
                text: 'Long-term healing commitment, not quick fixes'
              },
              { 
                icon: faHome, 
                text: 'Therapeutic community environment'
              },
              { 
                icon: faUserFriends, 
                text: 'Safe, structured space to face challenges'
              },
              { 
                icon: faGraduationCap, 
                text: 'Gradual rebuilding with increased responsibility'
              },
              { 
                icon: faAward, 
                text: 'Over three decades of proven results'
              },
              { 
                icon: faLightbulb, 
                text: 'Lives of clarity, accountability, and purpose'
              }
            ].map((pill, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: palette.surface,
                  borderRadius: '25px',
                  padding: '0.75rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease',
                  transform: pillsEntered ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.96)',
                  opacity: pillsEntered ? 1 : 0,
                  transitionDelay: `${index * 120}ms`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(8px) scale(1.01)';
                  setHoveredPill(index);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0) scale(1)';
                  setHoveredPill(null);
                }}
              >
                <div style={{
                  backgroundColor: '#C19721',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FCFCFA',
                  flexShrink: 0
                }}>
                  <FontAwesomeIcon icon={pill.icon} size="sm" />
                </div>
                <div style={{ margin: 0 }}>
                  <AnimatedText 
                    text={pill.text} 
                    isAnimating={hoveredPill === index}
                    palette={palette}
                    animationTime={animationTime}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        ...sectionStyle,
        backgroundColor: palette.surface,
        borderRadius: '0',
        margin: '0',
        maxWidth: 'none'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: windowWidth <= 480 ? '1fr' : windowWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { icon: faShield, title: 'Trusted Since 1988', desc: 'Over three decades of proven results' },
              { icon: faUsers, title: 'Therapeutic Community', desc: 'Supportive environment for growth' },
              { icon: faGraduationCap, title: 'Long-term Healing', desc: 'Not a quick fix, but lasting change' },
              { icon: faHandshake, title: 'Structured Support', desc: 'Accountability with compassion' }
            ].map((feature, index) => (
              <div key={index} style={{ padding: '1.5rem' }}>
                <div style={{
                  backgroundColor: '#191918',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  color: '#FCFCFA'
                }}>
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                  color: palette.text
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: palette.mutedText,
                  lineHeight: '1.5',
                  fontSize: '0.9rem'
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={sectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '300',
            marginBottom: '1rem',
            fontFamily: '"PT Serif", serif'
          }}>
            {testimonialSection?.heading}
          </h2>
        </div>
        
        <div style={testimonialCardStyle}>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <p style={{ 
              fontSize: '1.1rem', 
              fontStyle: 'italic',
              lineHeight: '1.6',
              marginBottom: '1.5rem',
              color: palette.text,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 4, // Limit to 4 lines max
              WebkitBoxOrient: 'vertical'
            }}>
              &ldquo;{testimonialSection?.items[currentTestimonial]?.quote}&rdquo;
            </p>
            <p style={{ 
              fontWeight: '600',
              fontSize: '1rem',
              color: palette.mutedText,
              margin: 0
            }}>
              — {testimonialSection?.items[currentTestimonial]?.name}
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <button 
            onClick={() => setCurrentTestimonial(prev => 
              prev === 0 ? testimonialSection.items.length - 1 : prev - 1
            )}
            style={{
              backgroundColor: 'transparent',
              border: `2px solid ${palette.text}`,
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: palette.text,
              transition: 'all 0.3s ease'
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {testimonialSection?.items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: index === currentTestimonial ? palette.text : palette.surface,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
          
          <button 
            onClick={() => setCurrentTestimonial(prev => 
              prev === testimonialSection.items.length - 1 ? 0 : prev + 1
            )}
            style={{
              backgroundColor: 'transparent',
              border: `2px solid ${palette.text}`,
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: palette.text,
              transition: 'all 0.3s ease'
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>

      {/* Getting Started Timeline Section */}
      <section style={{ 
        backgroundColor: palette.surface,
        margin: '0 0 3rem 0',
        padding: '4rem 0'
      }}>
        <div style={{ 
          display: 'flex',
          minHeight: '380px',
          maxWidth: '900px',
          margin: '0 auto',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: palette.text
        }}>
          {/* Left Image Panel */}
          <div style={{
            flex: windowWidth <= 768 ? '0' : '0 0 50%',
            position: 'relative',
            backgroundImage: 'url(/Images/p6.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '16px 0 0 16px',
            overflow: 'hidden',
            display: windowWidth <= 768 ? 'none' : 'block'
          }}>
            {/* Text Overlay on Image */}
            <div style={{
              position: 'absolute',
              left: 'clamp(1.5rem, 4vw, 2.5rem)',
              bottom: '25%',
              zIndex: 2,
              maxWidth: '280px'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.5vw, 1.9rem)',
                fontWeight: '700',
                color: palette.background,
                fontFamily: '"PT Serif", serif',
                lineHeight: '1.1',
                margin: '0 0 0.8rem 0'
              }}>
                Getting Started
              </h2>
              <p style={{
                fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                color: palette.surface,
                fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                lineHeight: '1.4',
                margin: 0
              }}>
                Your journey to recovery starts with these simple steps
              </p>
            </div>
            
            {/* Overlay for better text readability */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${palette.text}99 0%, ${palette.text}66 100%)`,
              zIndex: 1
            }} />
          </div>
          
          {/* Right Timeline Panel */}
          <div style={{
            flex: windowWidth <= 768 ? '1' : '0 0 50%',
            padding: windowWidth <= 768 ? '2rem' : '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: palette.text,
            borderRadius: windowWidth <= 768 ? '16px' : '0 16px 16px 0'
          }}>
            {/* Mobile heading */}
            {windowWidth <= 768 && (
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.6rem', 
                  fontWeight: '300',
                  marginBottom: '0.5rem',
                  fontFamily: '"PT Serif", serif',
                  color: palette.background
                }}>
                  Getting Started
                </h2>
                <p style={{ 
                  fontSize: '0.9rem', 
                  lineHeight: '1.4',
                  color: palette.surface,
                  maxWidth: '400px',
                  margin: '0 auto'
                }}>
                  Your journey to recovery starts with these simple steps
                </p>
              </div>
            )}
            
            {/* Timeline Container - Properly Centered */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '350px',
              marginRight: '5rem'
            }}>
              {/* Timeline Line */}
              <div style={{
                position: 'absolute',
                left: '18px',
                top: '30px',
                bottom: '30px',
                width: '2px',
                background: `repeating-linear-gradient(
                  to bottom,
                  ${palette.surface}60 0px,
                  ${palette.surface}60 6px,
                  transparent 6px,
                  transparent 12px
                )`,
                zIndex: 1
              }} />
              
              {/* Timeline Steps */}
              {[
                {
                  icon: faFileAlt,
                  title: 'Verify Insurance',
                  description: 'Check coverage and benefits with our support team',
                  action: 'Verify Now',
                  href: '/contact#verify-insurance'
                },
                {
                  icon: faComments,
                  title: 'Initial Consultation',
                  description: 'Speak with our specialists about your needs',
                  action: 'Call 866-425-2470',
                  href: 'tel:18664252470'
                },
                {
                  icon: faCalendarCheck,
                  title: 'Assessment',
                  description: 'Complete intake process and treatment planning',
                  action: 'Schedule',
                  href: '/contact'
                },
                {
                  icon: faMapMarkerAlt,
                  title: 'Begin Journey',
                  description: 'Start your path to lasting recovery',
                  action: 'Learn More',
                  href: '/programs'
                }
              ].map((step, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: index === 3 ? '0' : '1.8rem',
                    zIndex: 2
                  }}
                  onMouseEnter={() => setActiveTimelineStep(index)}
                  onMouseLeave={() => setActiveTimelineStep(null)}
                >
                  {/* Step Icon */}
                  <div style={{
                    position: 'absolute',
                    left: '2px',
                    top: '50%',
                    transform: activeTimelineStep === index 
                      ? 'translateY(-50%) scale(1.05)' 
                      : 'translateY(-50%) scale(1)',
                    width: '32px',
                    height: '32px',
                    backgroundColor: activeTimelineStep === index ? palette.primary : palette.text,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    color: activeTimelineStep === index ? palette.text : palette.primary,
                    fontSize: '0.8rem',
                    transition: 'all 0.3s ease',
                    boxShadow: activeTimelineStep === index ? `0 3px 12px ${palette.primary}40` : 'none',
                    zIndex: 3
                  }}>
                    <FontAwesomeIcon icon={step.icon} />
                  </div>
                  
                  {/* Step Content Card */}
                  <div style={{
                    flex: 1,
                    marginLeft: '2.8rem',
                    marginRight: '1rem',
                    backgroundColor: palette.text,
                    padding: '0.9rem',
                    borderRadius: '8px',
                    border: `1px solid ${palette.mutedText}20`,
                    transition: 'all 0.3s ease',
                    transform: activeTimelineStep === index ? 'translateY(-1px)' : 'translateY(0)'
                  }}>
                    <h3 style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.3rem',
                      color: palette.background
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontSize: '0.8rem',
                      lineHeight: '1.25',
                      marginBottom: '0.6rem',
                      color: palette.background
                    }}>
                      {step.description}
                    </p>
                    <a
                      href={step.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        color: palette.primary,
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = palette.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = palette.primary;
                      }}
                    >
                      {step.action}
                      <FontAwesomeIcon icon={faArrowRight} size="sm" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection 
        heading="Talk to a specialist"
        subheading="Take the first step toward lasting recovery and meaningful change. Our compassionate team is ready to discuss how our approach can help you or your loved one achieve lasting recovery."
        phoneNumber="866 425 2470"
        phoneHref="tel:18664252470"
        email="info@prescotthouse.com"
        showMotion={false}
      />

    </div>
  );
};

export default HomePage;
