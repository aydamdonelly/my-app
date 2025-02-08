import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaConciergeBell, FaEnvelope, FaTimes } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="logo">
        Bahar Nalbant
        <FaTimes className="close-icon" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
      </div>
      <ul>
        <li>
          <Link to="/" onClick={toggleSidebar}>
            <FaHome /> Startseite
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={toggleSidebar}>
            <FaUser /> Über mich
          </Link>
        </li>
        <li>
          <Link to="/services" onClick={toggleSidebar}>
            <FaConciergeBell /> Leistungen
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={toggleSidebar}>
            <FaEnvelope /> Kontakt
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
