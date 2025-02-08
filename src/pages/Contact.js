import React from 'react';

const Contact = () => {
  return (
    <div>
      {/* Kontaktinformationen */}
      <section className="section">
        <h2>Kontakt</h2>
        <p>
          Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir freuen uns auf Ihre Nachricht.
        </p>
        <img src="https://placehold.co/600x400" alt="Kontakt" />
      </section>

      {/* Standort & Anfahrt */}
      <section className="section">
        <h3>Standort & Anfahrt</h3>
        <p>
          Unsere Praxis befindet sich zentral. Nutzen Sie den untenstehenden Lageplan als Orientierung.
        </p>
        <img src="https://placehold.co/600x400" alt="Kartenplatzhalter" />
      </section>

      {/* Öffnungszeiten */}
      <section className="section">
        <h3>Öffnungszeiten</h3>
        <p>
          Montag - Freitag: 08:00 - 18:00 Uhr<br />
          Samstag: 09:00 - 13:00 Uhr
        </p>
      </section>
    </div>
  );
};

export default Contact;
