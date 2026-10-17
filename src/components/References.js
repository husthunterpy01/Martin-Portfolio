import React from 'react';
import { Link } from 'react-router-dom';
import { PiEnvelopeSimple, PiLinkedinLogo } from 'react-icons/pi';
import { references } from '../data/references';

const References = () => (
  <section id="references" className="section page">
    <div className="container reveal">
      <h1 className="page-title">References</h1>
      <p className="page-intro">
        People who have worked with me and can speak to my work.
        {references.length === 0 &&
          ' Referee details are available on request, so please get in touch.'}
      </p>

      {references.length > 0 && (
        <ul className="ref-list">
          {references.map((r) => (
            <li key={r.name} className="ref-row tilt" data-tilt="2">
              <div className="ref-person">
                <span className="ref-avatar" aria-hidden="true">
                  {r.name.split(' ').map((w) => w[0]).join('')}
                </span>
                <h2 className="ref-name">{r.name}</h2>
                <p className="ref-role">{r.role}</p>
                <p className="ref-org">{r.org}</p>
                {r.relationship && <p className="ref-rel">{r.relationship}</p>}
                <div className="ref-links">
                  {r.email && (
                    <a href={`mailto:${r.email}`} className="ref-icon" aria-label={`Email ${r.name}`}>
                      <PiEnvelopeSimple aria-hidden="true" />
                    </a>
                  )}
                  {r.linkedin && (
                    <a href={r.linkedin} target="_blank" rel="noreferrer" className="ref-icon" aria-label={`${r.name} on LinkedIn`}>
                      <PiLinkedinLogo aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
              {r.quote && (
                <blockquote className="ref-quote">
                  <span className="ref-mark" aria-hidden="true">&ldquo;</span>
                  {r.quote}
                </blockquote>
              )}
            </li>
          ))}
        </ul>
      )}

      {references.length > 0 && (
        <div className="ref-note">
          <p>Referees are happy to speak with employers on request.</p>
          <Link to="/contact" className="btn primary">
            Request a reference
          </Link>
        </div>
      )}
    </div>
  </section>
);

export default References;
