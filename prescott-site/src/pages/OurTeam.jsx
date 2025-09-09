import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHandsHelping, faAward, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import siteData from '../../json/mainSiteData.json';

const OurTeam = () => {
  const { palette } = useDarkMode();

  // Dynamic slideshow words
  const slideshowWords = ["Experienced", "Compassionate", "Committed"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  // Modal state
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % slideshowWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slideshowWords.length]);

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    document.body.style.overflow = 'unset';
  };

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


  const sectionStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  };

  const cardStyle = {
    backgroundColor: palette.surface,
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '1.5rem',
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px ${palette.primary}10`
  };


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
            backgroundImage: 'url(/Images/g6.jpg)',
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
              Our Team
            </h1>
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

      {/* ==================== TEAM MEMBERS GRID ==================== */}
      <motion.section 
        variants={itemVariants}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 2rem 2rem 2rem'
        }}
      >
        <motion.h2 
          variants={itemVariants}
          style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: '700',
            color: palette.text,
            marginBottom: '3rem',
            fontFamily: '"PT Serif", serif',
            textAlign: 'center',
            lineHeight: '1.2'
          }}
        >
          Meet Our Team
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {siteData.ourTeam.members.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                boxShadow: `0 15px 40px ${palette.primary}20`
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => openModal(member)}
              style={{
                backgroundColor: palette.surface,
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: `0 8px 25px ${palette.primary}10`,
                height: '400px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Member Image */}
              <div style={{
                height: '250px',
                backgroundColor: palette.background,
                backgroundImage: `url(${member.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }} />
              
              {/* Member Info */}
              <div style={{
                padding: '1.5rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  fontWeight: '700',
                  color: palette.text,
                  marginBottom: '0.5rem',
                  fontFamily: '"PT Serif", serif',
                  lineHeight: '1.2'
                }}>
                  {member.name}
                </h3>
                
                <p style={{
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                  color: palette.primary,
                  fontWeight: '600',
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                  margin: '0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {member.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.div variants={itemVariants} style={sectionStyle}>

        {/* About Our Team */}
        <motion.div variants={itemVariants} style={cardStyle}>
          <FontAwesomeIcon 
            icon={faHeart} 
            style={{ 
              fontSize: '2.5rem', 
              color: palette.primary, 
              marginBottom: '1rem' 
            }} 
          />
          <motion.h2 
            key={currentWordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '600',
              color: palette.text,
              marginBottom: '1.5rem',
              fontFamily: '"PT Serif", serif',
              minHeight: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {slideshowWords[currentWordIndex]}.
          </motion.h2>
          
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
            lineHeight: '1.7',
            color: palette.mutedText,
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
            marginBottom: '1.5rem',
            maxWidth: '700px',
            margin: '0 auto 1.5rem auto'
          }}>
            Our dedicated team of professionals brings decades of combined experience in behavioral health, addiction treatment, and mental health care. Each member of our staff is carefully selected for their expertise, compassion, and commitment to helping individuals achieve lasting recovery.
          </p>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
            lineHeight: '1.7',
            color: palette.mutedText,
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
            marginBottom: '0',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            What makes our team unique is that many of our staff members are alumni of our programs. This lived experience, combined with professional training, allows us to provide unparalleled understanding and support to our clients.
          </p>
        </motion.div>


        {/* Team Values Grid */}
        <motion.div variants={itemVariants} style={{ marginTop: '2rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            fontWeight: '600',
            color: palette.text,
            marginBottom: '2rem',
            fontFamily: '"PT Serif", serif',
            textAlign: 'center'
          }}>
            Our Team Values
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1rem, 3vw, 1.5rem)'
          }}>
            {[
              {
                icon: faAward,
                title: "Clinical Excellence",
                description: "Our team maintains the highest standards of clinical practice, continuously updating their skills and knowledge to provide evidence-based treatment."
              },
              {
                icon: faHandsHelping,
                title: "Lived Experience",
                description: "Many of our staff members have walked the path of recovery themselves, bringing authentic understanding and hope to our clients."
              },
              {
                icon: faShieldAlt,
                title: "Compassionate Care",
                description: "We believe in treating every individual with dignity, respect, and unconditional positive regard throughout their journey."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{
                  ...cardStyle,
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  margin: '0',
                  textAlign: 'center'
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: palette.background,
                  boxShadow: `0 6px 25px ${palette.primary}20`
                }}
              >
                <FontAwesomeIcon 
                  icon={value.icon} 
                  style={{ 
                    fontSize: '2rem', 
                    color: palette.primary, 
                    marginBottom: '1rem' 
                  }} 
                />
                <h3 style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)',
                  fontWeight: '600',
                  color: palette.text,
                  marginBottom: '1rem',
                  fontFamily: '"PT Serif", serif'
                }}>
                  {value.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                  lineHeight: '1.6',
                  color: palette.mutedText,
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                  margin: '0'
                }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ==================== MODAL ==================== */}
      {isModalOpen && selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: palette.surface,
              borderRadius: '20px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: `0 20px 60px ${palette.primary}30`
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                color: palette.text,
                cursor: 'pointer',
                zIndex: 10,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = palette.primary + '20';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              ×
            </button>

            {/* Modal Content */}
            <div style={{
              padding: '0',
              overflowY: 'auto',
              maxHeight: '80vh'
            }}>
              {/* Member Image */}
              <div style={{
                height: '300px',
                backgroundColor: palette.background,
                backgroundImage: `url(${selectedMember.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }} />
              
              {/* Member Details */}
              <div style={{
                padding: '2rem'
              }}>
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: '700',
                  color: palette.text,
                  marginBottom: '0.5rem',
                  fontFamily: '"PT Serif", serif',
                  lineHeight: '1.2'
                }}>
                  {selectedMember.name}
                </h2>
                
                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  color: palette.primary,
                  fontWeight: '600',
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {selectedMember.title}
                </p>
                
                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  lineHeight: '1.7',
                  color: palette.mutedText,
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                  margin: '0'
                }}>
                  {selectedMember.description}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

    </motion.div>
  );
};

export default OurTeam;
