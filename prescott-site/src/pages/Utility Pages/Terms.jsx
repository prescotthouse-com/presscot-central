import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract, faPhone, faEnvelope, faMapMarkerAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Terms = () => {
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

  const warningBoxStyle = {
    backgroundColor: `${palette.primary}15`,
    border: `1px solid ${palette.primary}40`,
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem'
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
            icon={faFileContract} 
            style={{ 
              fontSize: '2rem', 
              color: palette.primary 
            }} 
          />
          <h1 style={titleStyle}>Terms of Service</h1>
        </div>
        <p style={{
          fontSize: '1.1rem',
          color: palette.mutedText,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Please read these terms and conditions carefully before using our services. These terms govern your relationship with Prescott House.
        </p>
      </div>

      <div style={warningBoxStyle}>
        <FontAwesomeIcon 
          icon={faExclamationTriangle} 
          style={{ 
            fontSize: '1.2rem', 
            color: palette.primary,
            marginTop: '0.2rem'
          }} 
        />
        <div>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: palette.primary }}>
            Important Notice
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            These terms are based on our comprehensive policies and procedures manual. By using our services, you agree to comply with all applicable state, federal, and local laws, as well as our facility guidelines.
          </p>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Facility Information</h2>
        <p style={paragraphStyle}>
          Prescott House is licensed by the Arizona Department of Health Services as a Residential Behavioral Health Facility (License #BH-4262). We provide treatment to individuals experiencing behavioral health issues that limit their ability to be independent or require treatment to maintain or enhance independence.
        </p>
        
        <h3 style={subsectionTitleStyle}>Scope of Services</h3>
        <p style={paragraphStyle}>Our licensed services include:</p>
        <ul style={listStyle}>
          <li style={listItemStyle}>Counseling services (individual, group, and family)</li>
          <li style={listItemStyle}>Assistance in the self-administration of medication</li>
          <li style={listItemStyle}>Treatment for substance-related and addictive disorders including gambling disorder</li>
          <li style={listItemStyle}>Treatment for sexual addiction and paraphilic disorders</li>
          <li style={listItemStyle}>Mental health and dual diagnosis treatment</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Admission Requirements and Appropriateness</h2>
        <p style={paragraphStyle}>
          It is presumed that residents accepted for admission are appropriate for the agency and can safely participate in our therapeutic community environment. This includes being able to:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>Complete daily chores and maintain personal hygiene</li>
          <li style={listItemStyle}>Safely use household cleaning materials and kitchen equipment</li>
          <li style={listItemStyle}>Navigate the property safely</li>
          <li style={listItemStyle}>Function in an environment with open ingress/egress</li>
          <li style={listItemStyle}>Attend medical appointments and fill prescriptions independently</li>
          <li style={listItemStyle}>Store and prepare food safely</li>
        </ul>
        
        <p style={paragraphStyle}>
          <strong>Note:</strong> Individuals who are a threat to themselves or others or are experiencing an acute psychiatric episode warranting hospitalization are not appropriate for our program.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Resident Rights</h2>
        <p style={paragraphStyle}>All residents have the following rights:</p>
        <ul style={listStyle}>
          <li style={listItemStyle}>To be treated with dignity, respect, and consideration</li>
          <li style={listItemStyle}>To not be subjected to abuse, neglect, exploitation, or retaliation</li>
          <li style={listItemStyle}>To privacy in treatment, correspondence, and personal affairs</li>
          <li style={listItemStyle}>To consent to or refuse treatment (except in emergencies)</li>
          <li style={listItemStyle}>To be informed of treatment alternatives and associated risks</li>
          <li style={listItemStyle}>To participate in treatment planning and goal setting</li>
          <li style={listItemStyle}>To review their own medical records upon written request</li>
          <li style={listItemStyle}>To receive treatment in the least restrictive environment</li>
          <li style={listItemStyle}>To not be discriminated against based on race, religion, gender, age, disability, or other protected characteristics</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Program Agreement and Expectations</h2>
        <p style={paragraphStyle}>
          All residents must agree to and follow our Program Agreement, which includes but is not limited to:
        </p>
        
        <h3 style={subsectionTitleStyle}>Prohibited Behaviors</h3>
        <p style={paragraphStyle}>The following behaviors may result in involuntary discharge:</p>
        <ul style={listStyle}>
          <li style={listItemStyle}>Threatening or intimidating employees or peers</li>
          <li style={listItemStyle}>Use, possession, or knowledge of illegal substances or misuse of prescribed medication</li>
          <li style={listItemStyle}>Possession of weapons</li>
          <li style={listItemStyle}>Any type of gambling</li>
          <li style={listItemStyle}>Sexual harassment or inappropriate sexual references</li>
          <li style={listItemStyle}>Violation of state, local, or federal law</li>
          <li style={listItemStyle}>Possession or viewing of pornography</li>
          <li style={listItemStyle}>Continued pattern of Program Agreement violations</li>
        </ul>

        <h3 style={subsectionTitleStyle}>Property Rules</h3>
        <ul style={listStyle}>
          <li style={listItemStyle}>Residents must sign in and out when entering or exiting the premises</li>
          <li style={listItemStyle}>Smoking and tobacco use are only allowed in designated areas</li>
          <li style={listItemStyle}>Pets and animals are not allowed</li>
          <li style={listItemStyle}>Residents are responsible for their own meals and personal belongings</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Treatment and Medical Services</h2>
        <p style={paragraphStyle}>
          Prescott House is a behavioral health provider and does not provide physical health services. All residents must:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>See a medical practitioner within 7 days of admission (unless recently seen)</li>
          <li style={listItemStyle}>Participate in treatment planning and goal setting</li>
          <li style={listItemStyle}>Attend scheduled counseling sessions and group activities</li>
          <li style={listItemStyle}>Follow medication administration protocols if applicable</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Confidentiality and Records</h2>
        <p style={paragraphStyle}>
          All client records are confidential and protected under HIPAA regulations. Information will only be released:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>With prior written consent from the client or designee</li>
          <li style={listItemStyle}>As directed by state and federal law</li>
          <li style={listItemStyle}>Under court order</li>
          <li style={listItemStyle}>For state audit or Joint Commission survey</li>
          <li style={listItemStyle}>In emergency situations as required by law</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Grievance Procedures</h2>
        <p style={paragraphStyle}>
          If you have concerns regarding treatment or services, please follow these steps:
        </p>
        <ol style={listStyle}>
          <li style={listItemStyle}>Discuss concerns with your Primary Therapist</li>
          <li style={listItemStyle}>If unresolved, discuss at the next staff meeting</li>
          <li style={listItemStyle}>If still unresolved, discuss with the Clinical Director or Administrator</li>
          <li style={listItemStyle}>If satisfaction is not achieved, contact Arizona Department of Health Services at (602) 364-2595</li>
        </ol>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Emergency Procedures</h2>
        <p style={paragraphStyle}>
          Prescott House does not utilize physical restraints or emergency safety responses. In situations involving aggressive, destructive, or threatening behavior:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>Staff will attempt verbal de-escalation when appropriate</li>
          <li style={listItemStyle}>If unsuccessful or inappropriate, 911 will be called</li>
          <li style={listItemStyle}>Other clients will be advised to leave the area for safety</li>
          <li style={listItemStyle}>Staff will prioritize the safety of all individuals</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Financial Policies</h2>
        <p style={paragraphStyle}>
          Financial contracts are initiated at the onset of treatment with terms set therein. Clients may voluntarily open personal funds accounts managed by our Business Office Manager with full documentation and the ability to close at any time.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Limitation of Liability</h2>
        <p style={paragraphStyle}>
          By accepting treatment at Prescott House, you acknowledge that you understand the nature of our services and agree to participate in good faith in your treatment program. Our liability is limited to the scope of services we are licensed to provide.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Changes to Terms</h2>
        <p style={paragraphStyle}>
          These terms may be updated periodically to reflect changes in our policies, procedures, or applicable laws. Significant changes will be communicated to current residents and posted on our website.
        </p>
      </div>

      <div style={contactBoxStyle}>
        <h2 style={{
          ...sectionTitleStyle,
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          Questions About These Terms?
        </h2>
        <p style={paragraphStyle}>
          If you have any questions about these terms of service, please contact us:
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

export default Terms;
