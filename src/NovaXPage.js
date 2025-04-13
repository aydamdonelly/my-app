import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import './App.css';

function NovaXPage() {
  return (
    <div className="app">
      {/* Left Social Sidebar */}
      <div className="social-sidebar">
        <a href="https://www.instagram.com/dr.baharnalbant/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://x.com/BaNalbant" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://facebook.com/people/Bahar-Nalbant/pfbid02kYgPc93C8bT6MASAjs8yJjPakBDs32TdUxb3q3odViX16zxFGZ6CtDuYGsMk2Ag6l/" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.linkedin.com/in/dr-med-bahar-nalbant-ba7a0614b/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="mailto:dr.med.baharnalbant@gmail.com">
          <FaEnvelope />
        </a>
        <Link to="/" className="home-button">
          <FaArrowLeft />
        </Link>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="logo">NX</div>
        <div className="contact-info">
          <div className="novax-content">
            <h2 className="novax-title">NovaX – The Shape of Futurism.</h2>
            <p className="novax-description">
              NovaX is dedicated to shaping the future. The mission is to redefine the boundaries of technology, medicine, and science while developing groundbreaking solutions.
            </p>
            
            <h3 className="novax-vision-title">Vision</h3>
            <p className="novax-vision-description">
              By developing innovative products and concepts, NovaX lays the foundation for a new era of progress. Technological advancements enable a more efficient, healthier, and sustainable future, where the boundaries between humans, technology, and the environment continue to merge.
            </p>
          </div>

          <div className="social-links-bottom">
            <a href="https://www.instagram.com/dr.baharnalbant/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://x.com/BaNalbant" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://facebook.com/people/Bahar-Nalbant/pfbid02kYgPc93C8bT6MASAjs8yJjPakBDs32TdUxb3q3odViX16zxFGZ6CtDuYGsMk2Ag6l/" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/dr-med-bahar-nalbant-ba7a0614b/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="mailto:dr.med.baharnalbant@gmail.com">
              <FaEnvelope />
            </a>
          </div>
          <Link to="/" className="back-button">Back to Main Page</Link>
        </div>
      </div>
    </div>
  );
}

export default NovaXPage;