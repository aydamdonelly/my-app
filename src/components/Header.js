import React from 'react';
import { FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <FaBars className="hamburger" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
      <h1>Dr. Bahar Nalbant</h1>
    </header>
  );
};

export default Header;
