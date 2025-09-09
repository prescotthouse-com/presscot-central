import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { motion } from 'framer-motion';
import ContactSection from '../components/ContactSection.jsx';
import siteData from '../../json/mainSiteData.json';

const About = () => {
  const { palette } = useDarkMode();
  const aboutData = siteData.pages.about;

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

  // Shared panel height to guarantee exact matching between left and right panels
  const panelHeight = 340; // px

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ backgroundColor: palette.background, minHeight: '100vh' }}
    >
      
      {/* ==================== HERO SECTION WITH IMAGE ==================== */}
      <motion.section 
        variants={itemVariants}
        style={{
          padding: '2rem',
          paddingTop: '3rem'
        }}
      >
        <div 
          className="hero-image"
          style={{
            position: 'relative',
            width: '100%',
            height: '70vh',
            minHeight: '500px',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundImage: 'url(/Images/p2.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
          {/* Left Side - Title */}
          <div 
            className="hero-content-left"
            style={{
              position: 'absolute',
              left: 'clamp(1rem, 5vw, 4rem)',
              bottom: '15%',
              zIndex: 2
            }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              color: palette.background,
              fontFamily: '"PT Serif", serif',
              lineHeight: '1.1',
              margin: 0
            }}>
              Our Approach
              <br />
              at Prescott House
            </h1>
          </div>

          {/* Right Side - Description and Button */}
          <div 
            className="hero-content-right"
            style={{
              position: 'absolute',
              right: 'clamp(1rem, 5vw, 4rem)',
              bottom: '16.9%',
              maxWidth: 'clamp(250px, 35vw, 350px)',
              zIndex: 2
            }}>
            <p style={{
              fontSize: 'clamp(0.9rem, 1vw, 1rem)',
              color: palette.background,
              fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              We believe in structure, time, and the courage to grow through discomfort.
            </p>
            
            <motion.a
              href={aboutData.cta.href}
              style={{
                backgroundColor: palette.background,
                color: palette.text,
                border: 'none',
                borderRadius: '15px',
                padding: '0.7rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </div>

          {/* Overlay for better text readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `${palette.text}66`,
            zIndex: 1
          }} />
        </div>
      </motion.section>

      {/* ==================== WHO WE ARE AND STATISTICS SECTION ==================== */}
      <motion.section 
        variants={itemVariants}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 2rem 2rem 2rem',
          display: 'flex',
          gap: '2rem',
          alignItems: 'stretch',
          flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
        }}
      >
        {/* Statistics Panel - Left */}
        <motion.div
          variants={itemVariants}
          style={{
            flex: '0 0 350px',
            height: `${panelHeight}px`,
            background: `linear-gradient(to bottom, ${palette.primary}, ${palette.accent})`,
            borderRadius: '20px',
            position: 'relative',
            padding: '2rem',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Logo */}
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            opacity: 0.75
          }}>
            <img 
              src="/Logos/logo-white.png" 
              alt="Prescott House Logo" 
              style={{
                width: '50px',
                height: 'auto'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Mission Text */}
          <div style={{
            color: palette.background,
            fontSize: '0.75rem',
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            lineHeight: '1.3'
          }}>
            The Prescott House
            <br />
            Mission
          </div>

          {/* Statistics */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end'
          }}>
            <div>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: palette.background,
                fontFamily: '"PT Serif", serif',
                lineHeight: '0.9'
              }}>
                {siteData.statistics.yearsInOperation}+
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: palette.background,
                fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
                marginTop: '0.5rem'
              }}>
                Years of Impact
              </div>
            </div>
            
            <div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: palette.background,
                fontFamily: '"PT Serif", serif',
                lineHeight: '0.9'
              }}>
                {siteData.statistics.staffGraduationRate}
              </div>
              <div style={{
                fontSize: '0.65rem',
                color: palette.background,
                fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
                marginTop: '0.3rem'
              }}>
                Staff Graduation<br />Rate
              </div>
            </div>
          </div>
        </motion.div>

        {/* Who We Are Panel - Right */}
        <motion.div
          variants={itemVariants}
          style={{
            flex: '1',
            height: `${panelHeight}px`,
            backgroundColor: palette.surface,
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box',
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 900 ? '1fr' : '1fr 260px',
            alignItems: 'stretch'
          }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Content Area */}
          <div style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%',
            boxSizing: 'border-box'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
              fontWeight: '700',
              marginTop: '0',
              marginBottom: '1rem',
              fontFamily: '"PT Serif", serif',
              lineHeight: '1.1',
              color: palette.text
            }}>
              Who We Are
            </h2>
            
            <p style={{
              fontSize: 'clamp(0.75rem, 1vw, 0.85rem)',
              lineHeight: '1.5',
              color: palette.mutedText,
              fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
              margin: '0 0 0.8rem 0'
            }}>
              At Prescott House, we believe that sustainable recovery does not come from shortcuts. It comes from structure, time, and the courage to grow through discomfort.
            </p>
            
            <p style={{
              fontSize: 'clamp(0.75rem, 1vw, 0.85rem)',
              lineHeight: '1.5',
              color: palette.mutedText,
              fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
              margin: '0'
            }}>
              Unlike models that offer temporary stabilization, our programs increase responsibility gradually and intentionally. We expect mistakes and welcome them, because growth comes from learning with accountability and support.
            </p>
          </div>

          {/* Image Column - fills panel height, rounded bottom-left, left border only */}
          <div style={{
            position: 'relative',
            height: '100%',
            width: window.innerWidth <= 900 ? '100%' : '260px',
            borderBottomLeftRadius: '80%',
            overflow: 'hidden'
          }}>
            <img
              src="/Images/g2.jpg"
              alt="Prescott House Team"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* ==================== WHAT MAKES US DIFFERENT SECTION ==================== */}
      <motion.section 
        variants={itemVariants}
        style={{
          padding: '2rem 2rem 4rem 2rem',
          backgroundColor: palette.background
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: '700',
            color: palette.text,
            marginBottom: '3rem',
            fontFamily: '"PT Serif", serif',
            textAlign: 'left',
            lineHeight: '1.2'
          }}>
            How We <span style={{ color: palette.primary }}>Simplify</span> Your<br />
            Recovery Experience
          </h2>

          {/* Simple Grid Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem',
            justifyItems: 'center'
          }}>
          {aboutData.sections[1].items.map((item, index) => {
            const images = ['/Images/p1.jpg', '/Images/g3.jpg', '/Images/g5.jpg', '/Images/p7.jpg', '/Images/g1.jpg'];
            const imageUrl = images[index] || '/Images/p1.jpg';
            
            return (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -8,
                  boxShadow: `0 15px 40px ${palette.text}25`
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  width: '100%',
                  height: '320px',
                  backgroundColor: palette.background,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: `0 8px 25px ${palette.text}15`,
                  border: `2px solid ${palette.surface}`,
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 200px',
                  alignItems: 'stretch',
                  cursor: 'pointer'
                }}
              >
                {/* Content Area */}
                <div style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: palette.text,
                    marginTop: '0',
                    marginBottom: '1rem',
                    fontFamily: '"PT Serif", serif',
                    lineHeight: '1.2'
                  }}>
                    {item.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    color: palette.mutedText,
                    margin: '0',
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                  }}>
                    {item.description}
                  </p>
                </div>

                {/* Image Area */}
                <div style={{
                  position: 'relative',
                  height: '100%',
                  overflow: 'hidden',
                  display: window.innerWidth <= 768 ? 'none' : 'block'
                }}>
                  <img 
                    src={imageUrl}
                    alt={`${item.title} illustration`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <ContactSection 
        heading={aboutData.sections[3].heading}
        subheading="Our compassionate team is ready to discuss how our approach can help you or your loved one achieve lasting recovery."
        quote={aboutData.sections[2].content}
        phoneNumber={aboutData.sections[3].phone.label}
        phoneHref={aboutData.sections[3].phone.href}
        email="info@prescotthouse.com"
        showMotion={true}
      />

    </motion.div>
  );
}

export default About;
