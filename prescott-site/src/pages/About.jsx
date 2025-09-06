import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPhone, faEnvelope, faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
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

      {/* ==================== CONTACT SECTION ==================== */}
      <motion.section 
        variants={itemVariants}
        style={{
          backgroundColor: palette.surface,
          margin: '0 2rem 2rem 2rem',
          borderRadius: '20px',
          overflow: 'hidden'
        }}
      >
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '2.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '700',
              color: palette.text,
              marginBottom: '0.8rem',
              fontFamily: '"PT Serif", serif',
              lineHeight: '1.2'
            }}>
              {aboutData.sections[3].heading}
            </h2>
            
            <p style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
              color: palette.mutedText,
              marginBottom: '0.8rem',
              fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
              lineHeight: '1.5',
              fontStyle: 'italic'
            }}>
              &ldquo;{aboutData.sections[2].content}&rdquo;
            </p>

            <p style={{
              fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
              color: palette.mutedText,
              marginBottom: '1.5rem',
              fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
              lineHeight: '1.5'
            }}>
              Our compassionate team is ready to discuss how our approach can help you or your loved one achieve lasting recovery.
            </p>

            {/* Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <motion.a 
                href={aboutData.sections[3].phone.href}
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
                  <div style={{ opacity: 0.7, fontSize: '0.85rem' }}>{aboutData.sections[3].phone.label}</div>
                </div>
              </motion.a>

              <motion.a 
                href="mailto:info@prescotthouse.com"
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
                  <div style={{ opacity: 0.7, fontSize: '0.85rem' }}>info@prescotthouse.com</div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <form style={{
              backgroundColor: palette.background,
              padding: '1.8rem',
              borderRadius: '16px',
              boxShadow: `0 8px 20px ${palette.text}10`,
              border: `1px solid ${palette.surface}`
            }}>
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
                    style={{
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
                    style={{
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
                    style={{
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
                  style={{
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
                  }}
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
          </motion.div>
        </div>
      </motion.section>

    </motion.div>
  );
}

export default About;
