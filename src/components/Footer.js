import React from 'react';

function Footer({ year }) {
  return (
    <footer className="footer">
      <p>© {year} MediCare Appointment System</p>
    </footer>
  );
}

export default Footer;