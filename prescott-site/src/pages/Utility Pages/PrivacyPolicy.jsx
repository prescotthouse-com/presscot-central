import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const PrivacyPolicy = () => {
  const { palette } = useDarkMode();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: windowWidth <= 768 ? '2rem 1rem' : '3rem 2rem',
    backgroundColor: palette.background,
    color: palette.text,
    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
    lineHeight: '1.6'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '3rem',
    paddingBottom: '2rem',
    borderBottom: `2px solid ${palette.surface}`
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '300',
    color: palette.text,
    marginBottom: '1rem',
    fontFamily: '"PT Serif", serif'
  };

  const sectionStyle = {
    marginBottom: '2.5rem'
  };

  const sectionTitleStyle = {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: palette.primary,
    marginBottom: '1rem',
    fontFamily: '"PT Serif", serif'
  };

  const subsectionTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: palette.text,
    marginBottom: '0.8rem',
    marginTop: '1.5rem'
  };

  const paragraphStyle = {
    marginBottom: '1rem',
    fontSize: '0.95rem',
    color: palette.text
  };

  const listStyle = {
    marginLeft: '1.5rem',
    marginBottom: '1rem'
  };

  const listItemStyle = {
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
    color: palette.text
  };

  const contactBoxStyle = {
    backgroundColor: palette.surface,
    padding: '2rem',
    borderRadius: '12px',
    marginTop: '3rem',
    textAlign: 'center'
  };

  const linkStyle = {
    color: palette.primary,
    textDecoration: 'none',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <FontAwesomeIcon 
            icon={faShieldAlt} 
            style={{ 
              fontSize: '2rem', 
              color: palette.primary 
            }} 
          />
          <h1 style={titleStyle}>Privacy Policy</h1>
        </div>
        <p style={{
          fontSize: '1.1rem',
          color: palette.mutedText,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Your privacy and confidentiality are of utmost importance to us. This policy explains how we collect, use, and protect your information.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Overview</h2>
        <p style={paragraphStyle}>
          This privacy policy has been compiled to better serve those who are concerned with how their 'Personally Identifiable Information' (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context.
        </p>
        <p style={paragraphStyle}>
          Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Your Rights as a Client</h2>
        <p style={paragraphStyle}>Clients have the right:</p>
        <ul style={listStyle}>
          <li style={listItemStyle}>To privacy in treatment, including the right not to be recorded, photographed, or filmed without general consent, except for identification and administrative purposes, security recordings, or as provided by Arizona law.</li>
          <li style={listItemStyle}>Upon written request, to review their own record during the agency's hours of operation or at a time agreed upon by the clinical director.</li>
          <li style={listItemStyle}>To confidentiality of all medical and treatment records in accordance with HIPAA regulations.</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>HIPAA Privacy Policy</h2>
        <h3 style={subsectionTitleStyle}>Your Information | Your Rights | Our Responsibilities</h3>
        <p style={paragraphStyle}>
          This notice describes how medical information about you may be disclosed and used, along with how you can get access to this information. Please review this information carefully.
        </p>
        
        <h3 style={subsectionTitleStyle}>When We Never Share Your Information</h3>
        <p style={paragraphStyle}>In the following cases, we never share your information unless you give us written permission:</p>
        <ul style={listStyle}>
          <li style={listItemStyle}>Marketing purposes</li>
          <li style={listItemStyle}>Sale of your information – Prescott House does not sell or share your information for the purpose of marketing</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Information We Collect</h2>
        
        <h3 style={subsectionTitleStyle}>What personal information do we collect?</h3>
        <p style={paragraphStyle}>
          When registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, phone number or other details to help you with your experience.
        </p>

        <h3 style={subsectionTitleStyle}>When do we collect information?</h3>
        <p style={paragraphStyle}>
          We collect information from you when you subscribe to a newsletter, fill out a form, use Live Chat or enter information on our site.
        </p>

        <h3 style={subsectionTitleStyle}>How do we use your information?</h3>
        <p style={paragraphStyle}>We may use the information we collect from you in the following ways:</p>
        <ul style={listStyle}>
          <li style={listItemStyle}>To send periodic emails regarding services</li>
          <li style={listItemStyle}>To follow up with them after correspondence (live chat, email or phone inquiries)</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>How We Protect Your Information</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>We do not use vulnerability scanning and/or scanning to PCI standards</li>
          <li style={listItemStyle}>We only provide articles and information. We never ask for credit card numbers</li>
          <li style={listItemStyle}>We use regular Malware Scanning</li>
          <li style={listItemStyle}>Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential</li>
          <li style={listItemStyle}>All sensitive information you supply is encrypted via Secure Socket Layer (SSL) technology</li>
          <li style={listItemStyle}>We implement a variety of security measures when a user enters, submits, or accesses their information to maintain the safety of your personal information</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Cookies and Tracking</h2>
        <h3 style={subsectionTitleStyle}>Do we use 'cookies'?</h3>
        <p style={paragraphStyle}>
          We do not use cookies for tracking purposes. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings.
        </p>
        
        <h3 style={subsectionTitleStyle}>Third-party disclosure</h3>
        <p style={paragraphStyle}>
          We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information.
        </p>

        <h3 style={subsectionTitleStyle}>Third-party links</h3>
        <p style={paragraphStyle}>
          We do not include or offer third-party products or services on our website.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Compliance</h2>
        
        <h3 style={subsectionTitleStyle}>California Online Privacy Protection Act (CalOPPA)</h3>
        <p style={paragraphStyle}>According to CalOPPA, we agree to the following:</p>
        <ul style={listStyle}>
          <li style={listItemStyle}>Users can visit our site anonymously</li>
          <li style={listItemStyle}>Our Privacy Policy link includes the word 'Privacy' and can easily be found on our website</li>
          <li style={listItemStyle}>You will be notified of any Privacy Policy changes on our Privacy Policy Page</li>
          <li style={listItemStyle}>You can change your personal information by logging in to your account</li>
        </ul>

        <h3 style={subsectionTitleStyle}>Do Not Track Signals</h3>
        <p style={paragraphStyle}>
          We honor Do Not Track signals and Do Not Track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place.
        </p>

        <h3 style={subsectionTitleStyle}>Third-party Behavioral Tracking</h3>
        <p style={paragraphStyle}>
          It's also important to note that we do not allow third-party behavioral tracking.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Children's Privacy (COPPA)</h2>
        <p style={paragraphStyle}>
          When it comes to the collection of personal information from children under the age of 13 years old, the Children's Online Privacy Protection Act (COPPA) puts parents in control. We do not specifically market to children under the age of 13 years old.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>CAN-SPAM Act</h2>
        <p style={paragraphStyle}>
          The CAN-SPAM Act is a law that sets the rules for commercial email. We collect your email address in order to send information, respond to inquiries, and/or other requests or questions.
        </p>
        
        <p style={paragraphStyle}>To be in accordance with CANSPAM, we agree to the following:</p>
        <ul style={listStyle}>
          <li style={listItemStyle}>Not use false or misleading subjects or email addresses</li>
          <li style={listItemStyle}>Identify the message as an advertisement in some reasonable way</li>
          <li style={listItemStyle}>Include the physical address of our business or site headquarters</li>
          <li style={listItemStyle}>Monitor third-party email marketing services for compliance, if one is used</li>
          <li style={listItemStyle}>Honor opt-out/unsubscribe requests quickly</li>
          <li style={listItemStyle}>Allow users to unsubscribe by using the link at the bottom of each email</li>
        </ul>

        <p style={paragraphStyle}>
          If at any time you would like to unsubscribe from receiving future emails, you can email us at{' '}
          <a href="mailto:phouse@prescotthouse.com" style={linkStyle}>
            phouse@prescotthouse.com
          </a>{' '}
          and we will promptly remove you from ALL correspondence.
        </p>
      </div>

      <div style={contactBoxStyle}>
        <h2 style={{
          ...sectionTitleStyle,
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          Contact Us
        </h2>
        <p style={paragraphStyle}>
          If there are any questions regarding this privacy policy, you may contact us using the information below:
        </p>
        
        <div style={{
          display: 'flex',
          flexDirection: windowWidth <= 768 ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: palette.primary }} />
            <span>214 N Arizona Ave, Prescott, Arizona 86301</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FontAwesomeIcon icon={faPhone} style={{ color: palette.primary }} />
            <a href="tel:866-425-2470" style={linkStyle}>866-425-2470</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ color: palette.primary }} />
            <a href="mailto:phouse@prescotthouse.com" style={linkStyle}>
              phouse@prescotthouse.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
