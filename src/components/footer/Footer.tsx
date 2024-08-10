// components/Footer.tsx
import React from 'react';

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  borderTop: '1px solid #e7e7e7',
  position: 'absolute',
  bottom: 0,
  width: '100%',
};

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
