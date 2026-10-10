import React, { useState } from 'react';
import { PiCaretDown, PiMapPin, PiCalendarBlank } from 'react-icons/pi';

// Accordion timeline shared by Experience and Education.
// items: { title, org, logo, location?, period, details[] }
function Timeline({ items, defaultOpen = -1 }) {
  const [active, setActive] = useState(defaultOpen);

  return (
    <ol className="timeline">
      {items.map((item, idx) => {
        const isOpen = idx === active;
        const panelId = `timeline-panel-${item.org.replace(/\W+/g, '-')}-${idx}`;
        return (
          <li key={`${item.org}-${item.period}`} className="timeline-item">
            <button
              type="button"
              className={`timeline-header ${isOpen ? 'open' : ''}`}
              onClick={() => setActive(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <img src={item.logo} alt="" className="timeline-logo" />
              <span className="timeline-main">
                <span className="timeline-title">{item.title}</span>
                <span className="timeline-org">{item.org}</span>
                <span className="timeline-meta">
                  {item.location && (
                    <span className="timeline-meta-item">
                      <PiMapPin aria-hidden="true" />
                      {item.location}
                    </span>
                  )}
                  <span className="timeline-meta-item">
                    <PiCalendarBlank aria-hidden="true" />
                    {item.period}
                  </span>
                </span>
              </span>
              <PiCaretDown className="timeline-caret" aria-hidden="true" />
            </button>

            <div
              id={panelId}
              className={`timeline-panel ${isOpen ? 'open' : ''}`}
              role="region"
            >
              <ul className="timeline-details">
                {item.details.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default Timeline;
