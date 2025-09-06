import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faQuestionCircle, faExternalLinkAlt, faPhone, faBookOpen, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import LogoBar from '../components/LogoBar.jsx';
import siteData from '../../json/mainSiteData.json';

const Resources = () => {
  const { palette } = useDarkMode();
  const resourcesData = siteData.pages.resources;

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

  const resourceCardStyle = {
    backgroundColor: palette.surface,
    padding: '2rem',
    borderRadius: '16px',
    border: `1px solid ${palette.surface}`,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
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

  const getIconForResource = (label) => {
    if (label.toLowerCase().includes('blog')) return faBlog;
    if (label.toLowerCase().includes('faq')) return faQuestionCircle;
    return faBookOpen;
  };

  const additionalResources = [
    {
      title: "Understanding Addiction",
      description: "Learn about the science behind addiction, how it affects the brain, and why professional treatment is essential for recovery.",
      icon: faLightbulb,
      color: palette.primary
    },
    {
      title: "Family Support",
      description: "Resources and guidance for families and loved ones supporting someone through addiction recovery and treatment.",
      icon: faBookOpen,
      color: palette.accent
    },
    {
      title: "Recovery Planning",
      description: "Tools and strategies for creating a comprehensive recovery plan that supports long-term sobriety and wellness.",
      icon: faQuestionCircle,
      color: palette.primary
    }
  ];

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
            icon={faBookOpen} 
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
          {resourcesData.hero.heading}
        </h1>
        
        <p style={{
          fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
          color: palette.mutedText,
          fontFamily: '"PT Serif", serif',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          {resourcesData.hero.subheading}
        </p>
      </motion.section>

      {/* Main Content */}
      <motion.div variants={itemVariants} style={sectionStyle}>
        
        {/* Explore Section */}
        <motion.div variants={itemVariants}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '600',
            color: palette.text,
            marginBottom: '3rem',
            fontFamily: '"PT Serif", serif',
            textAlign: 'center'
          }}>
            {resourcesData.sections[0].heading}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {resourcesData.sections[0].items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={resourceCardStyle}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 10px 30px ${palette.surface}` 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = palette.background;
                  e.currentTarget.style.borderColor = palette.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = palette.surface;
                  e.currentTarget.style.borderColor = palette.surface;
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <FontAwesomeIcon 
                      icon={getIconForResource(item.label)} 
                      style={{ 
                        color: palette.primary, 
                        fontSize: '2rem',
                        padding: '1rem',
                        backgroundColor: `${palette.primary}15`,
                        borderRadius: '50%'
                      }} 
                    />
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: palette.text,
                      margin: '0',
                      fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                    }}>
                      {item.label}
                    </h3>
                  </div>

                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: palette.mutedText,
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                    marginBottom: '2rem'
                  }}>
                    {item.label === 'Blog' && 
                      "Stay informed with our latest articles on addiction recovery, mental health, and wellness. Our blog features insights from our clinical team and success stories from our community."
                    }
                    {item.label === 'FAQ' && 
                      "Find answers to commonly asked questions about our treatment programs, insurance coverage, admission process, and what to expect during your stay at Prescott House."
                    }
                    {item.label === 'Reference Example' && 
                      "Explore additional resources and educational materials from trusted partners in the behavioral health field to support your recovery journey."
                    }
                  </p>
                </div>

                <motion.a
                  href={item.href}
                  target={item.target || '_self'}
                  rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                  style={{
                    ...buttonStyle,
                    alignSelf: 'flex-start'
                  }}
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
                  Visit {item.label}
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div variants={itemVariants}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '600',
            color: palette.text,
            marginBottom: '3rem',
            fontFamily: '"PT Serif", serif',
            textAlign: 'center'
          }}>
            Additional Support
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {additionalResources.map((resource, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{
                  ...resourceCardStyle,
                  background: `linear-gradient(135deg, ${resource.color}15 0%, ${palette.surface} 100%)`,
                  border: `2px solid ${resource.color}30`
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 10px 30px ${resource.color}20`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = palette.background;
                  e.currentTarget.style.borderColor = resource.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${resource.color}15 0%, ${palette.surface} 100%)`;
                  e.currentTarget.style.borderColor = `${resource.color}30`;
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <FontAwesomeIcon 
                      icon={resource.icon} 
                      style={{ 
                        color: resource.color, 
                        fontSize: '2rem',
                        padding: '1rem',
                        backgroundColor: `${resource.color}15`,
                        borderRadius: '50%'
                      }} 
                    />
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      color: palette.text,
                      margin: '0',
                      fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                    }}>
                      {resource.title}
                    </h3>
                  </div>

                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: palette.mutedText,
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
                    margin: '0'
                  }}>
                    {resource.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Educational Content */}
        <motion.div 
          variants={itemVariants}
          style={{
            backgroundColor: palette.surface,
            padding: '3rem',
            borderRadius: '16px',
            textAlign: 'center',
            marginTop: '4rem'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: '600',
            color: palette.text,
            marginBottom: '2rem',
            fontFamily: '"PT Serif", serif'
          }}>
            Knowledge is Power in Recovery
          </h2>
          
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: '1.8',
            color: palette.mutedText,
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
            maxWidth: '800px',
            margin: '0 auto 2rem auto'
          }}>
            Education plays a crucial role in successful recovery. Understanding addiction, mental health, and the recovery process empowers individuals and families to make informed decisions and maintain long-term sobriety.
          </p>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: '1.8',
            color: palette.mutedText,
            fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
            maxWidth: '800px',
            margin: '0 auto',
            fontStyle: 'italic'
          }}>
            &ldquo;Recovery is not a destination, but a journey of continuous learning and growth.&rdquo;
          </p>
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
          Need personalized guidance?
        </h2>
        
        <p style={{
          fontSize: '1.1rem',
          color: palette.mutedText,
          marginBottom: '2rem',
          fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
        }}>
          Our team is here to answer your questions and help you find the right resources for your recovery journey.
        </p>

        <a href={resourcesData.sections[1].phone.href} style={{ textDecoration: 'none' }}>
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
            {resourcesData.sections[1].phone.label}
          </motion.button>
        </a>
      </motion.section>
    </motion.div>
  );
};

export default Resources;
