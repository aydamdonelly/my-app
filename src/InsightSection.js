import React, { useState } from 'react';
import './InsightSection.css';

const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    shortDescription: 'A short overview of Project Alpha.',
    longDescription:
      'Project Alpha is an innovative study focusing on advanced diagnostic methods in emergency medicine. It leverages modern technologies and interdisciplinary research to improve patient outcomes.',
    image: 'https://placehold.co/400x300'
  },
  {
    id: 2,
    title: 'Project Beta',
    shortDescription: 'A brief summary of Project Beta.',
    longDescription:
      'Project Beta involves a comprehensive investigation into new training protocols for medical staff. The project aims to streamline procedures and enhance patient care in critical settings.',
    image: 'https://placehold.co/400x300'
  },
  {
    id: 3,
    title: 'Project Gamma',
    shortDescription: 'An overview of Project Gamma.',
    longDescription:
      'Project Gamma is dedicated to developing community health initiatives that emphasize preventive medicine. It combines research with practical outreach to achieve measurable health improvements.',
    image: 'https://placehold.co/400x300'
  },
  {
    id: 4,
    title: 'Project Delta',
    shortDescription: 'A short description of Project Delta.',
    longDescription:
      'Project Delta focuses on innovative emergency response strategies, aiming to integrate real-time data analytics with traditional methods to save lives during critical situations.',
    image: 'https://placehold.co/400x300'
  },
  {
    id: 5,
    title: 'Project Epsilon',
    shortDescription: 'Overview of Project Epsilon.',
    longDescription:
      'Project Epsilon explores the intersection of technology and medicine, focusing on how wearable devices and AI can improve patient monitoring and early diagnosis in a variety of clinical settings.',
    image: 'https://placehold.co/400x300'
  }
];

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="insight-card" onClick={() => setExpanded(!expanded)}>
      <img src={project.image} alt={project.title} />
      <h4>{project.title}</h4>
      <p>{project.shortDescription}</p>
      {expanded && (
        <div className="project-details">
          <p>{project.longDescription}</p>
        </div>
      )}
    </div>
  );
};

const InsightSection = () => {
  return (
    <div className="insight-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default InsightSection;
