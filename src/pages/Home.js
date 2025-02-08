import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Hero-Sektion */}
      <section className="section">
        <h2>Willkommen bei Dr. Bahar Nalbant</h2>
        <p>
          Herzlich willkommen! Hier erhalten Sie einen ersten Einblick in unsere Praxis und unsere Philosophie.
        </p>
        <img src="https://placehold.co/600x400" alt="Hero Platzhalter" />
      </section>

      {/* Über Uns */}
      <section className="section">
        <h3>Über die Praxis</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>
        <img src="https://placehold.co/600x400" alt="Praxis Platzhalter" />
      </section>

      {/* Leistungen */}
      <section className="section">
        <h3>Unsere Leistungen</h3>
        <p>
          Erfahren Sie mehr über die innovativen und patientenorientierten Leistungen, die wir anbieten.
        </p>
        <img src="https://placehold.co/600x400" alt="Leistungen Platzhalter" />
      </section>
    </div>
  );
};

export default Home;
