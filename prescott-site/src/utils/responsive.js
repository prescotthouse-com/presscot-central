// Responsive utility functions
export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px'
};

export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`
};

export const getResponsiveStyles = (styles) => {
  return {
    ...styles.base,
    [`@media (max-width: ${breakpoints.mobile})`]: styles.mobile || {},
    [`@media (max-width: ${breakpoints.tablet})`]: styles.tablet || {},
    [`@media (min-width: ${breakpoints.desktop})`]: styles.desktop || {}
  };
};
