import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faPhone, faUsers } from '@fortawesome/free-solid-svg-icons';
import LogoBar from '../components/LogoBar.jsx';
import siteData from '../../json/mainSiteData.json';

const OurTeam = () => {
  const { palette } = useDarkMode();
  const teamData = siteData.pages.team;

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

  const heroStyle = {
    padding: '4rem 2rem',
    textAlign: 'center',
    background: `linear-gradient(135deg, ${palette.background} 0%, ${palette.surface} 100%)`,
    borderBottom: `1px solid ${palette.surface}`
  };

  const sectionStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 2rem'
  };

  const teamImageStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '16px',
    marginBottom: '3rem'
  };

  const cardStyle = {
    backgroundColor: palette.surface,
    padding: '3rem',
    borderRadius: '16px',
    border: `1px solid ${palette.surface}`,
    textAlign: 'center',
    marginBottom: '3rem',
    transition: 'all 0.3s ease'
  };

  const buttonStyle = {
    backgroundColor: palette.primary,
    color: palette.background,
    border: 'none',
    borderRadius: '50px',
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none'
  };

  const ctaStyle = {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: palette.surface,
    marginTop: '4rem',
    borderRadius: '16px'
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ backgroundColor: palette.background, minHeight: '100vh' }}
    >
      <LogoBar />
      
      {/* Hero Section */}
      <motion.section variants={itemVariants} style={heroStyle}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FontAwesomeIcon 
            icon={faUsers} 
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
          color: palette.primary,
          marginBottom: '1rem',
          fontFamily: '"PT Serif", serif',
          lineHeight: '1.2'
        }}>
          {teamData.hero.heading}
        </h1>
        
        <p style={{
          fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
          color: palette.mutedText,
          fontFamily: '"PT Serif", serif',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          {teamData.hero.subheading}
        </p>
      </motion.section>

      {/* Main Content */}
      <motion.div variants={itemVariants} style={sectionStyle}>
        
        {/* Team Image */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src="/Images/g6.jpg" 
            alt="Prescott House Team" 
            style={teamImageStyle}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </motion.div>

        {/* About Our Team */}
        <motion.div variants={itemVariants} style={cardStyle}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: '600',
            color: palette.text,
            marginBottom: '2rem',
            fontFamily: '"PT Serif", serif'
          }}>
            Experienced. Compassionate. Committed.
          </h2>
          
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: '1.8',
            color: palette.mutedText,
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem auto'
          }}>
            Our dedicated team of professionals brings decades of combined experience in behavioral health, addiction treatment, and mental health care. Each member of our staff is carefully selected for their expertise, compassion, and commitment to helping individuals achieve lasting recovery.
          </p>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: '1.8',
            color: palette.mutedText,
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem auto'
          }}>
            What makes our team unique is that many of our staff members are alumni of our programs. This lived experience, combined with professional training, allows us to provide unparalleled understanding and support to our clients.
          </p>
        </motion.div>

        {/* External Link Section */}
        <motion.div 
          variants={itemVariants}
          style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${palette.primary}15 0%, ${palette.accent}15 100%)`,
            border: `2px solid ${palette.primary}30`
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: `0 10px 30px ${palette.primary}20`
          }}
        >
          <h3 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '600',
            color: palette.text,
            marginBottom: '1.5rem',
            fontFamily: '"PT Serif", serif'
          }}>
            Meet Our Full Team
          </h3>
          
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: palette.mutedText,
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
            marginBottom: '2rem'
          }}>
            Learn more about our clinical staff, therapists, and support team members who make recovery possible.
          </p>

          <motion.a
            href={teamData.sections[0].href}
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = palette.accent;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = palette.primary;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} />
            {teamData.sections[0].label}
          </motion.a>
        </motion.div>

        {/* Team Values Grid */}
        <motion.div variants={itemVariants} style={{ marginTop: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '600',
            color: palette.text,
            marginBottom: '3rem',
            fontFamily: '"PT Serif", serif',
            textAlign: 'center'
          }}>
            Our Team Values
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: "Clinical Excellence",
                description: "Our team maintains the highest standards of clinical practice, continuously updating their skills and knowledge to provide evidence-based treatment."
              },
              {
                title: "Lived Experience",
                description: "Many of our staff members have walked the path of recovery themselves, bringing authentic understanding and hope to our clients."
              },
              {
                title: "Compassionate Care",
                description: "We believe in treating every individual with dignity, respect, and unconditional positive regard throughout their journey."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{
                  ...cardStyle,
                  padding: '2rem',
                  margin: '0',
                  textAlign: 'left'
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: palette.background,
                  borderColor: palette.primary
                }}
              >
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '600',
                  color: palette.primary,
                  marginBottom: '1rem',
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                }}>
                  {value.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
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

      {/* CTA Section */}
      <motion.section variants={itemVariants} style={ctaStyle}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: '600',
          color: palette.text,
          marginBottom: '1rem',
          fontFamily: '"PT Serif", serif'
        }}>
          Ready to speak with our team?
        </h2>
        
        <p style={{
          fontSize: '1.1rem',
          color: palette.mutedText,
          marginBottom: '2rem',
          fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
        }}>
          Our compassionate staff is available to answer your questions and help you take the first step toward recovery.
        </p>

        <a href={teamData.sections[1].phone.href} style={{ textDecoration: 'none' }}>
          <motion.button
            style={buttonStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = palette.accent;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = palette.primary;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <FontAwesomeIcon icon={faPhone} />
            {teamData.sections[1].phone.label}
          </motion.button>
        </a>
      </motion.section>
    </motion.div>
  );
};

export default OurTeam;
