import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentSection, scrollToSection }) => {
  const sections = [
    { id: 0, label: 'Home' },
    { id: 1, label: 'Contact' },
    { id: 2, label: 'CV' },
    { id: 3, label: 'Projects' }
  ];

  return (
    <div className="sidebar">
      <ul>
        {sections.map((sec) => (
          <li
            key={sec.id}
            className={currentSection === sec.id ? 'active' : ''}
            onClick={() => scrollToSection(sec.id)}
          >
            {sec.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
