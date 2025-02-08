import React from 'react';

const About = () => {
  return (
    <div>
      {/* Einführung */}
      <section className="section">
        <h2>Über Dr. Bahar Nalbant</h2>
        <p>
          Erfahren Sie mehr über meinen Werdegang, meine Ausbildung und meine Philosophie in der Medizin.
        </p>
        <img src="https://placehold.co/600x400" alt="Ärztin Platzhalter" />
      </section>

      {/* Ausbildung */}
      <section className="section">
        <h3>Ausbildung & Erfahrung</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac neque sit amet ligula cursus efficitur.
        </p>
        <img src="https://placehold.co/600x400" alt="Ausbildung Platzhalter" />
      </section>

      {/* Philosophie */}
      <section className="section">
        <h3>Meine Philosophie</h3>
        <p>
          Ich glaube an eine ganzheitliche Betreuung und individuelle Patientenbetreuung, die auf Vertrauen basiert.
        </p>
        <img src="https://placehold.co/600x400" alt="Philosophie Platzhalter" />
      </section>
    </div>
  );
};

export default About;
