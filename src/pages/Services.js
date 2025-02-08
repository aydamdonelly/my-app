import React from 'react';

const Services = () => {
  return (
    <div>
      {/* Service 1 */}
      <section className="section">
        <h2>Medizinische Beratung</h2>
        <p>
          Individuelle Beratung und Diagnostik, die auf Ihre Bedürfnisse zugeschnitten ist.
        </p>
        <img src="https://placehold.co/600x400" alt="Medizinische Beratung" />
      </section>

      {/* Service 2 */}
      <section className="section">
        <h2>Präventivmaßnahmen</h2>
        <p>
          Innovative Präventionsprogramme zur Gesundheitsvorsorge und Früherkennung.
        </p>
        <img src="https://placehold.co/600x400" alt="Prävention" />
      </section>

      {/* Service 3 */}
      <section className="section">
        <h2>Therapeutische Betreuung</h2>
        <p>
          Umfassende therapeutische Betreuung, von traditionellen Methoden bis hin zu modernen Ansätzen.
        </p>
        <img src="https://placehold.co/600x400" alt="Therapie" />
      </section>
    </div>
  );
};

export default Services;
