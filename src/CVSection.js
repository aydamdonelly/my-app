import React, { useState } from 'react';
import './CVSection.css';

const cvData = [
  {
    title: 'Professional Career',
    content: (
      <div className="cv-content">
        <p>
          Since 01/2021: Resident physician in advanced training for Internal Medicine at Hannover Medical School.
          Rotations include Cardiology, Nephrology, Central Emergency Department, Internal Intensive Care Unit, and Gastroenterology.
        </p>
        <p>
          Since 03/2024: Licensed in emergency medicine – actively participating in the MHH emergency service pool.
        </p>
      </div>
    )
  },
  {
    title: 'Additional Training',
    content: (
      <div className="cv-content">
        <p>
          ABS Course Module 1 &mdash; GCP Training.
        </p>
      </div>
    )
  },
  {
    title: 'Academic Training',
    content: (
      <div className="cv-content">
        <p>
          12/2023: Doctorate (Dr. med) from Hannover Medical School. <br />
          Topic: Impact of cancer diseases on the stability of partnerships.
        </p>
        <p>
          2014-2020: Studied Human Medicine at Hannover Medical School (Grade: 1).<br />
          2014: General university entrance qualification (Gymnasium Leibnizschule Hannover, Grade: 1.3).
        </p>
      </div>
    )
  },
  {
    title: 'Teaching',
    content: (
      <div className="cv-content">
        <p>
          Since 10/2024: Clinical elective in Acute and Emergency Medicine.
          Active member &amp; co-founder of Section Palliative Medicine (DGIIN) and involved in University teaching at MHH.
        </p>
      </div>
    )
  },
  {
    title: 'Scientific Activity',
    content: (
      <div className="cv-content">
        <p>
          Member of the Working Group Translational Intensive Care Medicine (MHH). Presented posters and lectures at EASL, DGIIN, and DGSV Congress.
        </p>
      </div>
    )
  },
  {
    title: 'Accolades & Memberships',
    content: (
      <div className="cv-content">
        <p>
          Scholarship holder (Studienstiftung des Deutschen Volkes, 2014-2020) and member of various German medical societies.
        </p>
      </div>
    )
  },
  {
    title: 'References & Research Projects',
    content: (
      <div className="cv-content">
        <p>
          PubMed: Nalbant B. <br />
          Ongoing studies include the Amanita Toxin Study, Legionella Study, Tuberculosis Study, and ARDS Study.
        </p>
      </div>
    )
  }
];

const CVSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="cv-container">
      {cvData.map((item, index) => (
        <div key={index} className="accordion-item">
          <div className="accordion-header" onClick={() => toggleAccordion(index)}>
            <h3>{item.title}</h3>
            <span className="accordion-icon">{openIndex === index ? '-' : '+'}</span>
          </div>
          <div
            className={`accordion-content ${openIndex === index ? 'open' : ''}`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CVSection;
