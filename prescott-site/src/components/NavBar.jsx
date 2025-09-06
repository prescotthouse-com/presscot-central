import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import DarkModeButton from '../logicalButtons/DarkModeButton.jsx';

const NavBar = () => {
  const { palette } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Menu items array - easily configurable
  const menuItems = [
    { title: 'HOME', endpoint: '/' },
    { title: 'ABOUT', endpoint: '/about' },
    { 
      title: 'PROGRAMS', 
      endpoint: '/programs',
      dropdown: [
        { title: 'Love and Intimacy', endpoint: '/love-and-intimacy' },
        { title: 'Gambling Addiction', endpoint: '/gambling-addiction' },
        { title: 'Substance Use Disorder', endpoint: '/substance-use-disorder' }
      ]
    },
    { title: 'CONTACT', endpoint: '/contact' },
    { title: 'OUR TEAM', endpoint: '/team' },
    { title: 'RESOURCES', endpoint: '/resources' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navBarStyle = {
    backgroundColor: palette.background,
    borderBottom: `1px solid ${palette.text}`,
    padding: '0',
    position: 'sticky',
    top: '0',
    zIndex: '1000',
    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px'
  };

  const desktopMenuStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    gap: '2rem'
  };

  const menuItemStyle = {
    fontSize: '0.6rem',
    fontWeight: '400',
    color: palette.text,
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem'
  };

  const dropdownContainerStyle = {
    position: 'relative',
    display: 'inline-block'
  };

  const dropdownMenuStyle = {
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: palette.background,
    border: `1px solid ${palette.surface}`,
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '200px',
    zIndex: '1001',
    opacity: activeDropdown ? '1' : '0',
    visibility: activeDropdown ? 'visible' : 'hidden',
    transform: activeDropdown ? 'translateY(0)' : 'translateY(-10px)',
    transition: 'all 0.2s ease-in-out',
    padding: '0.5rem 0'
  };

  const dropdownItemStyle = {
    display: 'block',
    padding: '0.75rem 1rem',
    color: palette.text,
    textDecoration: 'none',
    fontSize: '0.65rem',
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    transition: 'background-color 0.2s ease',
    borderBottom: 'none'
  };

  const triangleStyle = {
    width: '0',
    height: '0',
    borderLeft: '3px solid transparent',
    borderRight: '3px solid transparent',
    borderTop: `4px solid ${palette.text}`,
    transition: 'border-top-color 0.3s ease'
  };


  const getInTouchButtonStyle = {
    backgroundColor: 'transparent',
    color: palette.text,
    border: `1px solid ${palette.text}`,
    borderRadius: '25px',
    padding: '0.4rem 1.2rem',
    fontSize: '0.7rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
    whiteSpace: 'nowrap'
  };

  const mobileMenuButtonStyle = {
    display: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    color: palette.text,
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem'
  };

  const mobileMenuStyle = {
    position: 'fixed',
    top: '70px',
    left: '0',
    right: '0',
    backgroundColor: palette.background,
    borderTop: `1px solid ${palette.surface}`,
    padding: '1rem',
    display: isMobileMenuOpen ? 'block' : 'none',
    zIndex: '999'
  };

  const mobileMenuItemStyle = {
    display: 'block',
    padding: '1rem 0',
    borderBottom: `1px solid ${palette.surface}`,
    fontSize: '1rem',
    color: palette.text,
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    cursor: 'pointer'
  };

  const mobileDropdownContainerStyle = {
    borderBottom: `1px solid ${palette.surface}`
  };

  const mobileDropdownHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    fontSize: '1rem',
    color: palette.text,
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    cursor: 'pointer'
  };

  const mobileDropdownItemStyle = {
    display: 'block',
    padding: '0.75rem 0 0.75rem 1rem',
    fontSize: '0.9rem',
    color: palette.mutedText,
    textDecoration: 'none',
    borderBottom: `1px solid ${palette.surface}`,
    textTransform: 'capitalize'
  };

  const mobileTriangleStyle = {
    width: '0',
    height: '0',
    borderLeft: '4px solid transparent',
    borderRight: '4px solid transparent',
    borderTop: `5px solid ${palette.text}`,
    transform: activeDropdown !== null ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease'
  };

  // Media query styles using window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container') && !event.target.closest('.mobile-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isMobile = windowWidth <= 1024;

  return (
    <>
      <nav style={navBarStyle}>
        <div style={containerStyle}>
          {/* Desktop Menu */}
          {!isMobile && (
            <ul style={desktopMenuStyle}>
              {menuItems.map((item, index) => (
                <li key={index} style={dropdownContainerStyle}>
                  {item.dropdown ? (
                    <div
                      className="dropdown-container"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link 
                        to={item.endpoint}
                        style={menuItemStyle}
                        onMouseOver={(e) => {
                          e.target.style.color = palette.primary;
                          const triangle = e.target.querySelector('.dropdown-triangle');
                          if (triangle) triangle.style.borderTopColor = palette.primary;
                        }}
                        onMouseOut={(e) => {
                          e.target.style.color = palette.text;
                          const triangle = e.target.querySelector('.dropdown-triangle');
                          if (triangle) triangle.style.borderTopColor = palette.text;
                        }}
                      >
                        {item.title}
                        <div className="dropdown-triangle" style={triangleStyle}></div>
                      </Link>
                      <div 
                        style={{
                          ...dropdownMenuStyle,
                          opacity: activeDropdown === index ? '1' : '0',
                          visibility: activeDropdown === index ? 'visible' : 'hidden',
                          transform: activeDropdown === index ? 'translateY(0)' : 'translateY(-10px)'
                        }}
                      >
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={dropdownIndex}
                            to={dropdownItem.endpoint}
                            style={dropdownItemStyle}
                            onMouseOver={(e) => e.target.style.backgroundColor = palette.surface}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            {dropdownItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      to={item.endpoint}
                      style={menuItemStyle}
                      onMouseOver={(e) => e.target.style.color = palette.primary}
                      onMouseOut={(e) => e.target.style.color = palette.text}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Right side buttons (Desktop) */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                style={getInTouchButtonStyle}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = palette.text;
                  e.target.style.color = palette.background;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = palette.text;
                }}
              >
                GET IN TOUCH
              </button>
              <DarkModeButton />
            </div>
          )}

          {/* Mobile buttons */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                style={mobileMenuButtonStyle}
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
              </button>
              <DarkModeButton />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobile && (
        <div style={mobileMenuStyle}>
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.dropdown ? (
                <div className="mobile-dropdown" style={mobileDropdownContainerStyle}>
                  <div 
                    style={mobileDropdownHeaderStyle}
                    onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                  >
                    <span>{item.title}</span>
                    <div 
                      style={{
                        ...mobileTriangleStyle,
                        transform: activeDropdown === index ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                    ></div>
                  </div>
                  {activeDropdown === index && (
                    <div>
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.endpoint}
                          style={mobileDropdownItemStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to={item.endpoint}
                  style={mobileMenuItemStyle}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
          <button 
            style={{
              ...getInTouchButtonStyle,
              width: '100%',
              marginTop: '1rem',
              display: 'block'
            }}
          >
            GET IN TOUCH
          </button>
        </div>
      )}
    </>
  );
};

export default NavBar;
