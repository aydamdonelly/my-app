import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import CVSection from './CVSection';
import InsightSection from './InsightSection';
import './App.css';

function App() {
  // Create refs for each section: Home, Contact, CV, Projects.
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  const [currentSection, setCurrentSection] = useState(0);

  // Keyboard navigation (arrow keys)
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(currentSection + 1, sectionRefs.length - 1);
      setCurrentSection(next);
      sectionRefs[next].current.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(currentSection - 1, 0);
      setCurrentSection(prev);
      sectionRefs[prev].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection]);

  const scrollToSection = (index) => {
    setCurrentSection(index);
    sectionRefs[index].current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <Sidebar currentSection={currentSection} scrollToSection={scrollToSection} />
      <div className="content-wrapper">
        {/* Home / Intro Section */}
        <section className="section home-section" ref={sectionRefs[0]}>
          <div className="home-content">
            <div className="logo">BN</div>
            <h1>Dr. med. Bahar Nalbant</h1>
            <p className="welcome-text">
              Welcome to my personal website. Here you'll find information about my background, experience, and projects.
              Feel free to explore and get in touch.
            </p>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="social-icon fab fa-instagram" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="social-icon fab fa-twitter" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="social-icon fab fa-youtube" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="social-icon fab fa-linkedin" />
              </a>
              <a href="mailto:dr.med.baharnalbant@gmail.com">
                <i className="social-icon fas fa-envelope" />
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section contact-section" ref={sectionRefs[1]}>
          <h2>Contact</h2>
          <div className="contact-details">
            <p className="contact-text">
              For inquiries or appointments, please email:
              <a href="mailto:dr.med.baharnalbant@gmail.com">
                {' '}dr.med.baharnalbant@gmail.com
              </a>
            </p>
            <div className="social-links contact-socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="social-icon fab fa-instagram" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="social-icon fab fa-twitter" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="social-icon fab fa-youtube" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="social-icon fab fa-linkedin" />
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Curriculum Vitae Section */}
        <section className="section cv-section" ref={sectionRefs[2]}>
          <h2>Curriculum Vitae</h2>
          <CVSection />
        </section>

        {/* Projects & Insights Section */}
        <section className="section insight-section" ref={sectionRefs[3]}>
          <h2>Projects &amp; Insights</h2>
          <InsightSection />
        </section>
      </div>
    </div>
  );
}

export default App;
