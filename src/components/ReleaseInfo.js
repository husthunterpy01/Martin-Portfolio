import React from 'react';

const features = [
  'Dark/light mode with celestial animation',
  'Hero section with typing + keyboard effects',
  'Interactive project cards and tech badges',
  'Expandable work experience timeline',
  'Contact form (EmailJS) + footer/social links',
];

const futureWork = [
  'Add blog / writing hub',
  'Publish deep project case studies',
  'Embed analytics / ML dashboards',
  'Add AI Agents to automate navigation and interactions',
  'Generate PDF CV via automated pipeline',
];

const ReleaseInfo = () => {
  return (
    <section id="release-info" className="release-info">
      <h2>Version & Roadmap</h2>
      <p className="release-version">Current Version: <strong>v1.1.0</strong> · Updated Nov 2025</p>

      <div className="release-grid">
        <div className="release-card">
          <h3>Features Included</h3>
          <ul>
            {features.map(feature => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="release-card">
          <h3>Future Work</h3>
          <ul>
            {futureWork.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ReleaseInfo;

